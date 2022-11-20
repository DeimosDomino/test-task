import { Injectable } from '@nestjs/common';
import { Transfer } from '@libs/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EventData } from 'web3-eth-contract';
import { CONFIG } from '@libs/config';
import Web3 from 'web3';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const web3 = require('web3');

@Injectable()
export class TransferService {
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>;

    /**
     * Преобразование события смарт-контракта в сущность трансфера
     * @param event - событие
     * @param timestamp - время события
     */
    async eventToEntity(event: EventData, timestamp?: Date): Promise<Transfer> {
        const WEB3: Web3 = new web3(CONFIG.WEB3.INFURA_HTTPS_ENDPOINT);
        return new Transfer({
            id: uuid(),
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            timestamp:
                timestamp ||
                new Date(
                    <number>(
                        (await WEB3.eth.getBlock(event.blockNumber)).timestamp
                    ) * 1000,
                ),
            from: event.returnValues.from,
            to: event.returnValues.to,
            quantity: parseInt(event.returnValues.value) / 1000000,
        });
    }

    /**
     * Создание и сохранение трансфера по событию
     * @param event - событие
     */
    async createTransfer(event: EventData): Promise<void> {
        if (
            await this.transferRepository.findOne({
                where: { transactionHash: event.transactionHash },
            })
        ) {
            return;
        }
        const transfer: Transfer = await this.eventToEntity(event);
        await this.transferRepository.save(transfer);
    }

    /**
     * Создание и сохранение трансферов по событиям
     * @param events - события
     */
    async createTransfers(events: EventData[]): Promise<void> {
        const WEB3: Web3 = new web3(CONFIG.WEB3.INFURA_HTTPS_ENDPOINT);
        const transfers: Transfer[] = [];
        const blockNumbers: number[] = Array.from(
            new Set(events.map((event) => event.blockNumber)),
        );
        const blocks = await Promise.all(
            blockNumbers.map((blockNumber) => WEB3.eth.getBlock(blockNumber)),
        );
        const map = new Map<number, Date>();
        for (let i = 0; i < blocks.length; i++)
            map.set(
                blockNumbers[i],
                new Date(<number>blocks[i].timestamp * 1000),
            );
        for (const event of events) {
            if (
                !(await this.transferRepository.findOne({
                    where: { transactionHash: event.transactionHash },
                }))
            )
                transfers.push(
                    await this.eventToEntity(event, map.get(event.blockNumber)),
                );
        }
        await this.transferRepository.save(transfers);
    }

    /**
     * Загрузка событий из N последних блоко
     * @param count - количество блоко(N)
     */
    async loadLastBlocks(count: number): Promise<void> {
        const WEB3: Web3 = new web3(CONFIG.WEB3.INFURA_HTTPS_ENDPOINT);
        const contract = new WEB3.eth.Contract(
            CONFIG.WEB3.ABI,
            CONFIG.WEB3.CONTRACT_ADDRESS,
        );
        const lastBlock = await WEB3.eth.getBlockNumber();
        let i;
        for (i = lastBlock - count; i + 500 < lastBlock; i += 500) {
            const events: EventData[] = await contract.getPastEvents(
                'Transfer',
                {
                    fromBlock: i,
                    toBlock: i + 500,
                },
            );
            await this.createTransfers(events);
        }
        const events: EventData[] = await contract.getPastEvents('Transfer', {
            fromBlock: i,
            toBlock: lastBlock,
        });
        await this.createTransfers(events);
    }
}

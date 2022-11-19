import { Injectable } from '@nestjs/common';
import { Transfer } from '@libs/domain';
import { WEB3 } from '@libs/web3';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EventData } from 'web3-eth-contract';

@Injectable()
export class TransferService {
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>;

    async eventToEntity(event: EventData, timestamp?: Date): Promise<Transfer> {
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

    async createTransfers(events: EventData[]): Promise<void> {
        const transfers: Transfer[] = [];

        const blockNumbers: number[] = Array.from(
            new Set(events.map((event) => event.blockNumber)),
        );

        const map = new Map<number, Date>();

        const blocks = await Promise.all(
            blockNumbers.map((blockNumber) => WEB3.eth.getBlock(blockNumber)),
        );
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
}

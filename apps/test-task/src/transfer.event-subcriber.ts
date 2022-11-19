import { CONFIG } from '@libs/config';
import 'reflect-metadata';
import { Inject, Injectable } from '@nestjs/common';
import { Event, OPTIONAL_EVENT, WEB3, Web3EventSubscriber } from '@libs/web3';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '@libs/domain';
import { Repository } from 'typeorm';
import { TransferService } from '@libs/services';
import { EventData } from 'web3-eth-contract';

@Injectable()
@Web3EventSubscriber({
    abi: CONFIG.WEB3.ABI,
    infura_endpoint: CONFIG.WEB3.INFURA_WSS_ENDPOINT,
    contract_address: CONFIG.WEB3.CONTRACT_ADDRESS,
})
export class TransferEventSubscriber {
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>;
    @Inject(TransferService) private readonly transferService: TransferService;

    /**
     * Обработка события Transfer
     * @param event
     */
    @Event('Transfer', OPTIONAL_EVENT.DATA)
    async transfer(event: EventData): Promise<void> {
        await this.transferService.createTransfer(event);
    }

    @Event('Transfer', OPTIONAL_EVENT.CONNECTED)
    async init(): Promise<void> {
        const contract = new WEB3.eth.Contract(
            CONFIG.WEB3.ABI,
            CONFIG.WEB3.CONTRACT_ADDRESS,
        );
        const lastBlock = await WEB3.eth.getBlockNumber();
        let i;
        for (
            i = lastBlock - CONFIG.WEB3.BLOCK_COUNT;
            i + 500 < lastBlock;
            i += 500
        ) {
            const events: EventData[] = await contract.getPastEvents(
                'Transfer',
                {
                    fromBlock: i,
                    toBlock: i + 500,
                },
            );
            await this.transferService.createTransfers(events);
        }
        const events: EventData[] = await contract.getPastEvents('Transfer', {
            fromBlock: i,
            toBlock: lastBlock,
        });
        await this.transferService.createTransfers(events);
    }
}

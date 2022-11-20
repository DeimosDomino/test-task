import { CONFIG } from '@libs/config';
import { Inject, Injectable } from '@nestjs/common';
import { Event, OPTIONAL_EVENT, Web3EventSubscriber } from '@libs/web3';
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
     * Обработка события Transfer(data)
     * @param event
     */
    @Event('Transfer', OPTIONAL_EVENT.DATA)
    async transfer(event: EventData): Promise<void> {
        await this.transferService.createTransfer(event);
    }

    /**
     * Обработка события Transfer(connected)
     */
    @Event('Transfer', OPTIONAL_EVENT.CONNECTED)
    async init(): Promise<void> {
        await this.transferService.loadLastBlocks(CONFIG.WEB3.BLOCK_COUNT);
    }
}

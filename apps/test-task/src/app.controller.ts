import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from '@libs/domain';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { TransferVolumeDto } from "./dto/transfer_volume.dto";

@Controller()
export class AppController {
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>;

    @Get('transfer-volume-chart')
    async getHello(@Query('days') days: number): Promise<TransferVolumeDto> {
        const curTime = moment.utc().subtract(days, 'd');
        const transferVolumes = await this.transferRepository.query(
            `SELECT time_bucket('2 hours', timestamp) as two_hours, SUM(quantity) as volume
                       FROM transfer
                       WHERE timestamp > '${curTime.format(
                           'YYYY.MM.DD HH:MM',
                       )}'
                       GROUP BY two_hours
                       ORDER BY two_hours;`,
        );
        return transferVolumes.map((x) => ({
            timestamp: x.two_hours,
            volume: x.volume,
        }));
    }
}

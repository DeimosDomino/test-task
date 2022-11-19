import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@libs/domain';

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: [TransferService],
    exports: [TransferService],
})
export class ServicesModule {}

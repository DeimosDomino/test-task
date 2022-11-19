import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TransferEventSubscriber } from './transfer.event-subcriber';
import { DomainModule, entities } from '@libs/domain';
import { ServicesModule } from '@libs/services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [DomainModule, ServicesModule, TypeOrmModule.forFeature(entities)],
    controllers: [AppController],
    providers: [TransferEventSubscriber],
})
export class AppModule {}

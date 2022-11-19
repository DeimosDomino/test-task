import { Column, DeepPartial, Entity, Index, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Transfer {
    constructor(data: DeepPartial<Transfer>) {
        Object.assign(this, data);
    }

    /** ID ордера */
    @Index()
    @PrimaryColumn()
    id: string;

    /** Номер блока */
    @Column('integer', { nullable: false })
    blockNumber: number;

    /** Хэш транзакции */
    @Index()
    @Column('varchar', { nullable: false })
    transactionHash: string;

    /** Дата транзакции */
    @Column('timestamp with time zone', { nullable: false })
    timestamp: Date;

    /** Отправитель */
    @Column('varchar', { nullable: false })
    from: string;

    /** Получатель */
    @Column('varchar', { nullable: false })
    to: string;

    /** Количество */
    @Column('numeric', { nullable: false })
    quantity: number;
}

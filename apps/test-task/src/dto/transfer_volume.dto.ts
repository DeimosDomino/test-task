import { ApiProperty } from '@nestjs/swagger';

export class TransferVolumeDto {
    @ApiProperty({ type: Date, description: 'Дата' })
    timestamp: Date;

    @ApiProperty({ type: Number, description: 'Объем' })
    volume: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, DeleteDateColumn } from 'typeorm';

export class SoftDeleteEntity extends BaseEntity {
  @ApiProperty({ example: '2023-01-01T08:00:00.303Z' })
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}

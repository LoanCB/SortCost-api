import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Expense extends TimestampEntity {
  @ApiProperty({ description: 'Name of the expense', example: 'Buying clothes Devred' })
  @Column({ nullable: false })
  name: string;

  @ApiPropertyOptional({ description: 'Text to add details of the expense', example: 'Shopping of the week' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ description: 'Expenditure amount', example: 19.99 })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 10 })
  amount: number;

  @ApiProperty({ description: 'Date on which the expense was incurred', example: new Date() })
  @Column({ nullable: false, type: 'datetime' })
  purchasedAt: Date;

  @ApiProperty({ description: 'Amount to be repaid later', example: 10 })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 10 })
  amountRefundable?: number;
}

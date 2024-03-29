import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Column, Entity, OneToOne, Relation } from 'typeorm';
import { RepeatUnity } from '../types/recurrent-rehearsal-repeat-unity.type';
import { Expense } from './expense.entity';

@Entity()
export class RecurrentRehearsal extends TimestampEntity {
  @ApiProperty({ description: 'Number of times payment will be made', example: 12 })
  @Column({ nullable: false, type: 'integer' })
  numberOfRepeat: number;

  @ApiProperty({ description: 'Amount to be deducted', example: 100 })
  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 10 })
  deposit: number;

  @ApiProperty({ description: 'Type of repetition ', example: RepeatUnity.MONTH })
  @Column({ nullable: false })
  repeatUnity: RepeatUnity;

  @ApiProperty({ description: 'Sampling date', example: new Date() })
  @Column({ nullable: false, type: 'datetime' })
  recurrentAt: Date;

  @OneToOne(() => Expense, (expense) => expense.reccurentRehearsal)
  expense: Relation<Expense>;
}

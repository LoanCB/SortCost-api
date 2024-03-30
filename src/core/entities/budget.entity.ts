import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Account } from './account.entity';
import { Expense } from './expense.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Budget extends BaseEntity {
  @ApiProperty({ description: 'Name of the budget', example: 'Salary' })
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'decimal', scale: 2, precision: 10 })
  @ApiProperty({ description: 'Amount credited', example: 1204.37 })
  amount: number;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: 'Description of the budget', example: 'June salary' })
  description?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ description: 'organisation that granted the credit', example: 'Society Foo' })
  author?: string;

  @ManyToOne(() => Account, (account) => account.budgets)
  account: Relation<Account>;

  @ManyToOne(() => Expense, (expense) => expense.budgets, { nullable: true })
  expense?: Relation<Expense>;
}

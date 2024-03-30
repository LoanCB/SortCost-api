import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Relation } from 'typeorm';
import { Budget } from './budget.entity';
import { Category } from './category.entity';
import { RecurrentRehearsal } from './recurrent-rehearsal.entity';
import { User } from 'src/users/entities/users.entity';
import { Account } from './account.entity';

import { BaseEntity } from 'src/common/entities/base.entity';
@Entity()
export class Expense extends BaseEntity {
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

  @OneToMany(() => Budget, (budget) => budget.expense)
  budgets?: Relation<Budget>[];

  @ManyToOne(() => Category, (category) => category.expenses)
  category: Relation<Category>;

  @OneToOne(() => RecurrentRehearsal, (reccurentRehearsal) => reccurentRehearsal.expense)
  @JoinColumn()
  reccurentRehearsal?: Relation<RecurrentRehearsal>;

  @ManyToOne(() => User, (user) => user.expenses)
  user: Relation<User>;

  @ManyToOne(() => Account, (account) => account.expenses)
  account: Relation<Account>;
}

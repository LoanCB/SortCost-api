import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SoftDeleteEntity } from 'src/common/entities/soft-delete.entity';
import { Column, Entity, ManyToMany, OneToMany, Relation } from 'typeorm';
import { Budget } from './budget.entity';
import { Category } from './category.entity';
import { Expense } from './expense.entity';
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Account extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the account', example: 'personal expenses' })
  @Column({ nullable: false })
  name: string;

  @ApiPropertyOptional({ description: 'Description of the account', example: 'Daily personal expenses' })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Budget, (budget) => budget.account)
  budgets: Relation<Budget>[];

  @OneToMany(() => Category, (category) => category.account)
  categories: Relation<Category>[];

  @OneToMany(() => Expense, (expense) => expense.account)
  expenses: Relation<Expense>[];

  @ManyToMany(() => User, (user) => user.accounts)
  users: Relation<User>[];
}

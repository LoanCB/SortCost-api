import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';
import CategoryIcon from '../types/category-icon.type';
import { Account } from './account.entity';
import { Expense } from './expense.entity';

@Entity()
export class Category extends TimestampEntity {
  @ApiProperty({ description: 'Name of the category', example: 'Shopping' })
  @Column({ nullable: false })
  name: string;

  @ApiPropertyOptional({ description: 'Spending limit not to be exceeded ', example: 200 })
  @Column({ nullable: true, type: 'decimal', scale: 2, precision: 10 })
  maxAmount?: number;

  @ApiPropertyOptional({
    description: 'Description to explain the category',
    example: 'Clothing expenses of the month',
  })
  @Column({ nullable: true })
  description?: string;

  @ApiPropertyOptional({ description: 'Icon of the category', example: CategoryIcon.SHOPPING })
  @Column({ nullable: false })
  icon?: CategoryIcon;

  @ManyToOne(() => Account, (account) => account.categories)
  account: Relation<Account>;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Relation<Expense>[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Relation } from 'typeorm';
import { Role } from './roles.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Expense } from 'src/core/entities/expense.entity';
import { Account } from 'src/core/entities/account.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: 'Firstname of the user', example: 'John' })
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty({ description: 'Lastname of the user', example: 'Doe' })
  @Column({ nullable: false })
  lastName: string;

  @ApiProperty({ description: 'Email of the user', example: 'john.doe@sortcost.com' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ description: 'Hashed password of the user used to authenticate', example: 'azerty123' })
  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({
    description: 'Boolean to check if account is active or not. Inactive user cannot be connect',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Date of which the account was archived', example: '2023-02-09T12:54:21.846Z' })
  @DeleteDateColumn({ type: 'timestamp' })
  archivedAt: Date;

  @ApiProperty({ type: Role })
  @ManyToOne(() => Role, (role) => role.users)
  role: Relation<Role>;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Relation<Expense>[];

  @ManyToMany(() => Account, (account) => account.users)
  @JoinTable()
  accounts: Relation<Account>[];
}

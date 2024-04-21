import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { Account } from './entities/account.entity';
import { Budget } from './entities/budget.entity';
import { Category } from './entities/category.entity';
import { Expense } from './entities/expense.entity';
import { RecurrentRehearsal } from './entities/recurrent-rehearsal.entity';
import { AccountController } from './controllers/account.controller';
import { AccountsService } from './services/account.service';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    TypeOrmModule.forFeature([Account, Budget, Category, Expense, RecurrentRehearsal]),
  ],
  controllers: [AccountController],
  providers: [AccountsService],
  exports: [],
})
export class CoreModule {}

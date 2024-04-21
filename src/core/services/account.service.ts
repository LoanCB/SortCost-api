import { AccountsListDto } from './../dto/accounts-list.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { generateEntityFilterAndPagination } from 'src/common/helpers/filter-repository.helper';
import dayjs from 'dayjs';
import { AccountList } from '../types/account-list.type';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UsersService } from 'src/users/services/users.service';
import { CustomError } from 'src/common/classes/custom-error.class';

@Injectable()
export class AccountsService {
  @InjectRepository(Account)
  accountRepository: Repository<Account>;

  constructor(private readonly usersService: UsersService) {}

  async findAllByUser(queryFilter: AccountsListDto): Promise<[AccountList[], number, number]> {
    const [searchFilter, multipleFilter, limit, offset] = generateEntityFilterAndPagination({ queryFilter });
    const whereFilter = multipleFilter
      .map(({ baseQuery, key }) => `${baseQuery} :${key}`)
      .filter(Boolean)
      .join(' AND ');
    const whereFilterValues = multipleFilter.reduce((acc: { [key: string]: string | dayjs.Dayjs }, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const accounts = await this.accountRepository
      .createQueryBuilder('a')
      .select(['a.name as name', 'a.description as description', 'COUNT(*) OVER() as total_results'])
      .innerJoin('a.users', 'u')
      .where(whereFilter, { search: `%${searchFilter}%`, ...whereFilterValues })
      .offset(offset)
      .limit(limit)
      .getRawMany();

    if (!accounts.length) {
      return [[], 0, 0];
    }

    const result = [];
    for (const account of accounts) {
      result.push({
        name: account.name,
        description: account.description,
      });
    }

    return [result, result.length, accounts[0].total_results];
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const users = await this.usersService.findByIds(createAccountDto.usersIds);
    if (!users.length) {
      throw new CustomError('Users not found', HttpStatus.NOT_FOUND);
    }

    return await this.accountRepository.save({
      name: createAccountDto.name,
      description: createAccountDto.description,
      users,
    });
  }
}
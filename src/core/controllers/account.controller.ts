import { AccountsService } from './../services/account.service';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Post,
  Body,
  HttpStatus,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonSwaggerResponse } from 'src/common/helpers/common-swagger-config.helper';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { RoleType } from 'src/users/types/role-type';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/entities/users.entity';
import { AccountsListDto, AccountsListFilterTable } from '../dto/accounts-list.dto';
import { PaginatedList } from 'src/common/types/pagination-params.types';
import { AccountList } from '../types/account-list.type';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { ErrorCodesService } from 'src/common/services/error-codes.service';

@Controller({
  path: 'accounts',
  version: ['1'],
})
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Accounts')
@CommonSwaggerResponse()
export class AccountController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly errorCodesService: ErrorCodesService,
  ) {}

  @Get()
  @Roles(RoleType.READ_ONLY)
  async findAllByUser(
    @Query() query: AccountsListDto,
    @Request() req: ExpressRequest,
  ): Promise<PaginatedList<AccountList>> {
    const user = req.user as User;
    query.filterTable = `${AccountsListFilterTable.USER}${query.filterTable ? ',' + query.filterTable : ''}`;
    query.filterField = `id${query.filterField ? ',' + query.filterField : ''}`;
    query.filterOp = `equals${query.filterOp ? ',' + query.filterOp : ''}`;
    query.filter = `${user.id}${query.filter ? ',' + query.filter : ''}`;

    const [accounts, currentResults, totalResults] = await this.accountsService.findAllByUser(query);
    return { ...query, totalResults, currentResults, results: accounts };
  }

  @Post()
  @Roles(RoleType.READ_ONLY)
  async createOne(@Body() createAccountDto: CreateAccountDto) {
    try {
      return await this.accountsService.create(createAccountDto);
    } catch (error) {
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new CustomHttpException(
          'USERS_NOT_FOUND',
          HttpStatus.NOT_FOUND,
          this.errorCodesService.get('USERS_NOT_FOUND', createAccountDto.usersIds),
        );
      }

      Logger.error(error);
      return new BadRequestException();
    }
  }
}

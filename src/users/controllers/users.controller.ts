import { CreateUserDto } from '../dto/create-user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { UsersService } from './../services/users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonSwaggerResponse } from 'src/common/helpers/common-swagger-config.helper';
import { RoleType } from '../types/role-type';
import { Roles } from '../decorators/roles.decorator';
import { SwaggerUserCreate, SwaggerUserFindAll } from '../helpers/user-set-decorators.helper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../entities/users.entity';

@Controller({
  path: 'users',
  version: ['1'],
})
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Users')
@CommonSwaggerResponse()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerUserCreate()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(RoleType.ADMINISTRATOR)
  @SwaggerUserFindAll()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}

import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './../services/users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({
  path: 'users',
  version: ['1'],
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}

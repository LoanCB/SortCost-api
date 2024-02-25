import { Injectable } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  usersRepository: Repository<User>;

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneOrFail({ where: { email }, relations: { role: true } });
  }
}

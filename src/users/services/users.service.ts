import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { CreateUserDto, FormatedCreatedUserDto } from '../dto/create-user.dto';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  usersRepository: Repository<User>;

  @InjectRepository(Role)
  rolesRepository: Repository<Role>;

  async create(createUserDto: CreateUserDto) {
    // Check if user already exist
    const isUserExist = await this.emailAlreadyExist(createUserDto.email);
    if (isUserExist) {
      throw new CustomHttpException('USER_EMAIL_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    // Find related role
    const role = await this.rolesRepository.findOne({ where: { name: createUserDto.role } });

    // Hash password
    const hashedPassword = await hash(createUserDto.password, 10);

    const formatedCreateUser: FormatedCreatedUserDto = {
      ...createUserDto,
      role,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    };
    return await this.usersRepository.save({ ...formatedCreateUser } as Partial<User>);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneOrFail({ where: { email }, relations: { role: true } });
  }

  async emailAlreadyExist(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ? true : false;
  }
}

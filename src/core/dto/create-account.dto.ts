import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ description: 'Name of the Account', example: 'Personal Expenses' })
  @IsString()
  @IsNotEmpty({ message: 'Account name is required' })
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the account',
    example: 'Account reserved to list personal expenses',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'List of users ids to add to the account', example: [1, 4, 7] })
  @IsNumber({}, { each: true, message: 'Invalid value. Need to be an array of numbers' })
  @IsNotEmpty({ message: 'UsersIds list is required' })
  usersIds: number[];
}

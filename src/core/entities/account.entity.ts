import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SoftDeleteEntity } from 'src/common/entities/soft-delete.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Account extends SoftDeleteEntity {
  @ApiProperty({ description: 'Name of the account', example: 'personal expenses' })
  @Column({ nullable: false })
  name: string;

  @ApiPropertyOptional({ description: 'Description of the account', example: 'Daily personal expenses' })
  @Column({ nullable: true })
  description?: string;
}

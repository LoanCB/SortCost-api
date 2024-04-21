import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import {
  IsEnum,
  IsOptional,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

enum AccountsSortableField {
  ID = 'id',
  CREATED_DATE_FIELD = 'createdAt',
  UPDATED_DATE_FIELD = 'updatedAt',
  NAME = 'name',
}

export enum AccountsListFilterTable {
  ACCOUNT = 'a',
  USER = 'u',
}

@ValidatorConstraint({ name: 'IsValidFilterTableArray', async: false })
class IsValidFilterTableArray implements ValidatorConstraintInterface {
  validate(values: string): boolean {
    const filterTableValues = Object.values(AccountsListFilterTable);
    const valueArray = values.split(',');
    return valueArray.every((value) => filterTableValues.includes(value as AccountsListFilterTable));
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `${validationArguments.property} contains invalid values. Allowed values: ${Object.values(
      AccountsListFilterTable,
    ).join(' | ')}`;
  }
}

export class AccountsListDto extends OmitType(PaginationParamsDto, ['sortField']) {
  @ApiPropertyOptional({
    example: AccountsSortableField.CREATED_DATE_FIELD,
    description: 'Name of the column to sort on',
    default: AccountsSortableField.CREATED_DATE_FIELD,
    enum: AccountsSortableField,
  })
  @IsEnum(AccountsSortableField, {
    message: `Unknown sort field. Allowed values : ${Object.values(AccountsSortableField).join(' | ')}`,
  })
  @IsOptional()
  sortField: AccountsSortableField = AccountsSortableField.CREATED_DATE_FIELD;

  @ApiPropertyOptional({
    description: 'Table name to apply filter (commat use at separator for multiple filters)',
    enum: AccountsListFilterTable,
    example: [AccountsListFilterTable.ACCOUNT, `${AccountsListFilterTable.ACCOUNT},${AccountsListFilterTable.USER}`],
  })
  @Validate(IsValidFilterTableArray, ['filterTable'])
  @IsOptional()
  filterTable?: string;
}

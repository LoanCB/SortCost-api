import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationParamsDto } from '../dto/pagination-params.dto';
import dayjs from 'dayjs';

export interface RelationParam {
  relation: string;
  alias: string;
  joins?: RelationParam[];
}

export interface EntityFilteredListOptions<Entity extends ObjectLiteral> {
  repository: Repository<Entity>;
  queryFilter: PaginationParamsDto;
  searchFields?: string[];
  isAndCondition?: boolean;
  relations?: RelationParam[];
  pkName?: string;
  withDeleted?: boolean;
}

export type EntityFilteredListResults<Entity> = Promise<[Entity[], number, number]>;

export interface ProcessedParams {
  filterField: string[];
  filterOp: string[];
  filter: string[];
  filterTable: string[];
}

export type GenerateEntityOptions = Pick<
  EntityFilteredListOptions<never>,
  'queryFilter' | 'searchFields' | 'isAndCondition'
>;

export interface SqlQueryWithParameter {
  baseQuery: string;
  key: string;
  value: string | dayjs.Dayjs;
}

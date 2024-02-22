import { DataSource, DataSourceOptions } from 'typeorm';
import configurationConfig from '../config/configuration.config';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService(configurationConfig());

export const AppDataSource: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: configService.get('node_env') === 'development' || configService.get('node_env') === 'test',
};

export const dataSource = new DataSource(AppDataSource);

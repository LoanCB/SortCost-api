import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './orm/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

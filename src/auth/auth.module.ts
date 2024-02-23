import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import configurationConfig from 'src/config/configuration.config';

const configService = new ConfigService(configurationConfig());

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: configService.get('secret'),
      signOptions: { expiresIn: `${configService.get('jwtTime')}s` },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

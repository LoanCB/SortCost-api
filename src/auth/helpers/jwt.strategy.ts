import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configurationConfig from 'src/config/configuration.config';
import { UsersService } from 'src/users/services/users.service';
import { CustomHttpException } from 'src/common/helpers/custom.exception';

const configService = new ConfigService(configurationConfig());

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneByEmail(payload.username);
    if (!user) {
      throw new CustomHttpException('INVALID_TOKEN', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}

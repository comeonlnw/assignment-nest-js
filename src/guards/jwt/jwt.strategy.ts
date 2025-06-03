import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  username: string;
}

export interface AuthUser {
  id: string;
  username: string;
}

export interface JwtConfigInterface {
  secret: string;
  expiresIn: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfigInterface>('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: JwtPayload): AuthUser {
    console.log('payload : ', payload);
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}

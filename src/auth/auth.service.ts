import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import JwtConfig from 'src/config/jwt.config';
import { Users } from 'src/user/entities/users.entity';
import { throwInstanceofError } from 'src/utils/error.util';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginReturnType } from './types/auth.type';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @Inject(JwtConfig.KEY)
    private jwtConfig: ConfigType<typeof JwtConfig>,
  ) {}

  async login(body: LoginDto): Promise<LoginReturnType> {
    const { username } = body;

    try {
      const findUser = await this.usersRepository.findOne({
        where: {
          username,
        },
      });

      if (!findUser) {
        throw new NotFoundException('No User Found');
      }

      const token: string = jwt.sign({ username }, this.jwtConfig.secret, {
        expiresIn: this.jwtConfig.signOptions.expiresIn,
      });

      return {
        token,
        username,
      };
    } catch (error: unknown) {
      this.logger.error({
        function: this.login.name,
        request: {
          body,
        },
        error,
      });

      throwInstanceofError(error);
    }
  }
}

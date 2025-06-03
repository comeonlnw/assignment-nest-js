import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Users } from 'src/user/entities/users.entity';

export type UserDecoratorType = {
  sub?: string;
};

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): unknown => {
    const request = ctx.switchToHttp().getRequest();
    const ifHasBarrier = request?.headers?.authorization
      ? request?.headers?.authorization?.split(' ')[1]
      : null;

    if (ifHasBarrier) {
      const user: Users = jwt.decode(ifHasBarrier);
      return user;
    }

    return request;
  },
);

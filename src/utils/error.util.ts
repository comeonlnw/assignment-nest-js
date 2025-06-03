import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const throwInstanceofError = (error: unknown): void => {
  if (error instanceof UnauthorizedException) {
    throw new UnauthorizedException(error.message, { cause: error?.cause });
  }

  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message, { cause: error?.cause });
  }

  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message, { cause: error?.cause });
  }

  throw new InternalServerErrorException(error);
};

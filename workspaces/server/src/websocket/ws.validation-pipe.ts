import {
  Injectable,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { SocketExceptions } from '@shared/server/SocketExceptions';
import { ServerException } from '@app/game/server.exception';

@Injectable()
export class WsValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors = []) => {
      if (this.isDetailedOutputDisabled) {
        return new ServerException(
          SocketExceptions.UnexpectedError,
          'Bad request',
        );
      }

      const errors = this.flattenValidationErrors(validationErrors);

      return new ServerException(SocketExceptions.UnexpectedPayload, errors);
    };
  }
}

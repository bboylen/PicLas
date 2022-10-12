import {
  Injectable,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class WsValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (ValidationErrors = []) => {
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

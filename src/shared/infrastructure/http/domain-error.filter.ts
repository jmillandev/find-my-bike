import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { DomainError } from '../../domain/errors/base';
import { Response } from 'express';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(exception.code).json({
      message: exception.message,
      statusCode: exception.code,
    });
  }
}

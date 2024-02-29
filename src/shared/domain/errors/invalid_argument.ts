import { DomainError } from './base';

export class InvalidArgument extends DomainError {
  constructor(message: string) {
    super(message, 422);
  }
}

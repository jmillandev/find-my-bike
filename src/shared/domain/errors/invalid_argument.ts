import { DomainError } from './base';

export class InvalidArgumentError extends DomainError {
  constructor(message: string) {
    super(message, 422);
  }
}

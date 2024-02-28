import { InvalidArgumentError } from '../errors/invalid_argument';

export abstract class ValueObject<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(
        `Value of <${this.constructor.name}> must be defined`,
      );
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }
}

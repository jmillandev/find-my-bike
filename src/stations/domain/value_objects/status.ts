import { InvalidArgumentError } from '../../../shared/domain/errors/invalid_argument';

enum Statuses {
  ACTIVE = 'IN_SERVICE',
  INACTIVE = 'NOT_IN_SERVICE',
}

export class StationStatus {
  readonly value: string;
  private validValues: string[];

  constructor(value: string) {
    this.value = value;
    this.validValues = Object.values(Statuses);
    this.checkValueIsValid(value);
  }

  checkValueIsValid(value: string): void {
    if (!this.validValues.includes(value)) {
      throw new InvalidArgumentError(
        `${value} is a invalid <${this.constructor.name}>`,
      );
    }
  }
}

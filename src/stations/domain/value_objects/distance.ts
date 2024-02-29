import { InvalidArgument } from '../../../shared/domain/errors/invalid_argument';
import { ValueObject } from '../../../shared/domain/value_objects/base';

export class StationDistance extends ValueObject<number> {
  constructor(distance: number) {
    super(parseInt(distance?.toString(), 10));
    this.ensureValuesIsPositive();
    this.ensureValuesIsInteger();
  }

  private ensureValuesIsPositive(): void {
    if (this.value < 0) {
      throw new InvalidArgument('Distance should be a positive number');
    }
  }

  private ensureValuesIsInteger(): void {
    if (!Number.isInteger(this.value)) {
      throw new InvalidArgument('Distance should be an integer');
    }
  }
}

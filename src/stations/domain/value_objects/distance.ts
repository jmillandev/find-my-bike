import { ValueObject } from '../../../shared/domain/value_objects/base';

export class StationDistance extends ValueObject<number> {
  constructor(distance: number) {
    super(distance);
    this.ensureValuesIsInteger(distance);
  }

  private ensureValuesIsInteger(distance: number): void {
    if (!Number.isInteger(distance)) {
      throw new Error('Distance should be an integer');
    }
  }
}

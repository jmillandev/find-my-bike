import { ValueObject } from '../../../shared/domain/value_objects/base';

export class StationDistance extends ValueObject<number> {
  constructor(distance: number) {
    super(distance);
  }
}

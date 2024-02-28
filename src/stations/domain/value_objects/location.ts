import { ValueObject } from '../../../shared/domain/value_objects/base';

export class StationLocation extends ValueObject<string> {
  constructor(location: string) {
    super(location);
  }
}

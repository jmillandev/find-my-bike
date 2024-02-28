import { ValueObject } from '../../../shared/domain/value_objects/base';

export class StationName extends ValueObject<string> {
  constructor(name: string) {
    super(name);
  }
}

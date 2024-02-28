import { InvalidArgumentError } from 'src/shared/domain/errors/invalid_argument';
import { ValueObject } from '../../../shared/domain/value_objects/base';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export class StationCoordinates extends ValueObject<Coordinates> {
  constructor(coordinates: Coordinates) {
    super(coordinates);
    this.ensureIsValidCoordinates(coordinates);
  }

  private ensureIsValidCoordinates(coordinates: Coordinates): void {
    if (Math.abs(coordinates.latitude) > 90) {
      throw new InvalidArgumentError(
        'Latitude must be between -90 and 90 degrees',
      );
    }
    if (Math.abs(coordinates.longitude) > 180) {
      throw new InvalidArgumentError(
        'Longitude must be between -180 and 180 degrees',
      );
    }
  }
}

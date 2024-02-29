import { InvalidArgument } from '../../../shared/domain/errors/invalid_argument';
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
    coordinates.latitude = parseFloat(coordinates.latitude?.toString());
    if (Number.isNaN(coordinates.latitude)) {
      throw new InvalidArgument('Latitude must be a number');
    }
    if (Math.abs(coordinates.latitude) > 90) {
      throw new InvalidArgument('Latitude must be between -90 and 90 degrees');
    }

    coordinates.longitude = parseFloat(coordinates.longitude?.toString());
    if (Number.isNaN(coordinates.longitude)) {
      throw new InvalidArgument('Longitude must be a number');
    }
    if (Math.abs(coordinates.longitude) > 180) {
      throw new InvalidArgument(
        'Longitude must be between -180 and 180 degrees',
      );
    }
  }
}

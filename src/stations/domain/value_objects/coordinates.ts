import { InvalidArgument } from '../../../shared/domain/errors/invalid_argument';
import { ValueObject } from '../../../shared/domain/value_objects/base';
import { StationDistance } from './distance';

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

  distance(coordinates: StationCoordinates): StationDistance {
    // Base on Haversine formula
    // TODO: Add tests cases
    const earthRadius = 6371e3; // metres
    const lat1 = (this.value.latitude * Math.PI) / 180; // φ, λ in radians
    const lat2 = (coordinates.value.latitude * Math.PI) / 180;
    const deltaLat =
      ((coordinates.value.latitude - this.value.latitude) * Math.PI) / 180;
    const deltaLong =
      ((coordinates.value.longitude - this.value.longitude) * Math.PI) / 180;

    const a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLong / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return new StationDistance(Math.round(earthRadius * c));
  }
}

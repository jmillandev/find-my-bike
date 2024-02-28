import { Station } from './entity';
import { StationCoordinates } from './value_objects/coordinates';
import { StationDistance } from './value_objects/distance';

export interface StationRepository {
  findNearby(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]>;
}

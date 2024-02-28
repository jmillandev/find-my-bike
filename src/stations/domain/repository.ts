import { Station } from './entiry';
import { StationCoordinates } from './value_objects/coordinates';
import { StationDistance } from './value_objects/distance';

export interface StationRepository {
  findNearbyStations(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]>;
}

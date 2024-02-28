import { Station } from '../domain/entiry';
import { StationRepository } from '../domain/repository';
import { StationCoordinates } from '../domain/value_objects/coordinates';
import { StationDistance } from '../domain/value_objects/distance';

export class StationFinder {
  constructor(private readonly stationRepository: StationRepository) {}

  async call(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]> {
    return this.stationRepository.findNearbyStations(coordinates, distance);
  }
}

import { Station } from '../domain/entiry';
import { StationCoordinates } from '../domain/value_objects/coordinates';

export class StationFinder {
  constructor(private readonly stationRepository: StationRepository) {}

  async run(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]> {
    return this.stationRepository.findNearbyStations(coordinates, distance);
  }
}

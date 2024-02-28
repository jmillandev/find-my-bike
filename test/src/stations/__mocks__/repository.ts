import { Station } from "src/stations/domain/entity";
import { StationRepository } from "src/stations/domain/repository";
import { StationCoordinates } from "src/stations/domain/value_objects/coordinates";
import { StationDistance } from "src/stations/domain/value_objects/distance";

export class StationRepositoryMock implements StationRepository {
  private findNearbyMock: jest.Mock;
  private stations: Array<Station> = [];

  constructor() {
    this.findNearbyMock = jest.fn();
  }

  async findNearby(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]> {
    this.findNearbyMock(coordinates, distance);
    return this.stations;
  }

  returnFindNearby(stations: Array<Station>) {
    this.stations = stations;
  }
}

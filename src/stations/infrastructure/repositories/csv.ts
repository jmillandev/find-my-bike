import { StationCoordinates } from 'src/stations/domain/value_objects/coordinates';
import { StationRepository } from '../../domain/repository';
import { StationDistance } from 'src/stations/domain/value_objects/distance';
import { Station } from 'src/stations/domain/entity';
import { jsonToStation } from './mapper';

export class CsvStationRepository implements StationRepository {
  private readonly csv: string;
  private stations: Array<Station> = [];

  constructor(csv: string) {
    this.csv = csv;
    this.stations = this.parseCsv(csv);
  }

  async findNearby(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]> {
    return this.stations.filter((station) => {
      return station.coordinates.distance(coordinates) < distance;
    });
  }

  private parseCsv(csv: string): Array<Station> {
    const lines = csv.split('\n');
    const stations = lines.map((line) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [id, name, obcn, location, latitude, longitude, status] =
        line.split(',');
      return jsonToStation({
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status,
        location,
      });
    });
    return stations;
  }
}

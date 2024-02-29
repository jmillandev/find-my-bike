import { StationCoordinates } from 'src/stations/domain/value_objects/coordinates';
import { StationRepository } from '../../domain/repository';
import { StationDistance } from 'src/stations/domain/value_objects/distance';
import { Station } from 'src/stations/domain/entity';
import { StationName } from 'src/stations/domain/value_objects/name';
import { StationStatus } from 'src/stations/domain/value_objects/status';
import { StationLocation } from 'src/stations/domain/value_objects/location';

interface StationJson {
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  location: string;
}

function jsonToStation(json: StationJson): Station {
  return new Station(
    new StationName(json.name),
    new StationCoordinates({
      latitude: json.latitude,
      longitude: json.longitude,
    }),
    new StationStatus(json.status),
    new StationLocation(json.location),
  );
}

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

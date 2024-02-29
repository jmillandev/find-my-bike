import { StationCoordinates } from 'src/stations/domain/value_objects/coordinates';
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

export function jsonToStation(json: StationJson): Station {
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

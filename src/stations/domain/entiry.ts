import { StationCoordinates } from './value_objects/coordinates';
import { StationLocation } from './value_objects/location';
import { StationName } from './value_objects/name';
import { StationStatus } from './value_objects/status';

export class Station {
  name: StationName;
  coordinates: StationCoordinates;
  status: StationStatus;
  location: StationLocation;
}

import { Station } from '../domain/entity';

export type StationResponse = {
  name: string;
  status: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export function stationToResponse(station: Station) {
  return {
    name: station.name.value,
    status: station.status.value,
    location: station.location.value,
    coordinates: {
      latitude: station.coordinates.latitude(),
      longitude: station.coordinates.longitude(),
    },
  };
}

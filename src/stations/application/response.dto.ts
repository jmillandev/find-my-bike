import { ApiProperty } from '@nestjs/swagger';
import { Station } from '../domain/entity';
import { StationStatuses } from '../domain/value_objects/status';

export class CoordinatesResponse {
  readonly latitude: number;
  readonly longitude: number;
}

export class StationResponse {
  readonly name: string;
  @ApiProperty({ enum: StationStatuses })
  readonly status: string;
  readonly location: string;
  readonly coordinates: CoordinatesResponse;
}

export function stationToResponse(station: Station): StationResponse {
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

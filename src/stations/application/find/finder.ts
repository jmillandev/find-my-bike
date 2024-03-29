import { Inject, Injectable } from '@nestjs/common';
import { Station } from '../../domain/entity';
import { StationRepository } from '../../domain/repository';
import { StationCoordinates } from '../../domain/value_objects/coordinates';
import { StationDistance } from '../../domain/value_objects/distance';

@Injectable()
export class StationFinder {
  constructor(
    @Inject(StationRepository)
    private readonly stationRepository: StationRepository,
  ) {}

  async call(
    latitude: number,
    longitude: number,
    distance: number,
  ): Promise<Station[]> {
    const coordinates = new StationCoordinates({ latitude, longitude });
    const distanceVO = new StationDistance(distance);
    return this.stationRepository.findNearby(coordinates, distanceVO);
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { FindStationQuery } from '../../application/find/query';
import { StationFinder } from '../../application/find/finder';
import { StationResponse, stationToResponse } from '../../application/response';

@Controller('stations')
export class HttpController {
  constructor(private readonly finder: StationFinder) {}

  @Get()
  async findNearby(
    @Query() params: FindStationQuery,
  ): Promise<StationResponse[]> {
    const stations = await this.finder.call(
      params.latitude,
      params.longitude,
      params.distance,
    );
    return stations.map(stationToResponse);
  }
}

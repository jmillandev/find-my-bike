import { Controller, Get, Query } from '@nestjs/common';
import { FindStationQuery } from '../../application/find/query.dto';
import { StationFinder } from '../../application/find/finder';
import {
  StationResponse,
  stationToResponse,
} from '../../application/response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('payment-intents')
@Controller('stations')
export class HttpController {
  constructor(private readonly finder: StationFinder) {}

  @Get()
  @ApiOperation({ summary: 'Find nearby stations' })
  @ApiOkResponse({ type: [StationResponse] })
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

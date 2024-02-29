import { createReadStream } from 'fs';
import { Station } from '../../domain/entity';
import { StationRepository } from '../../domain/repository';
import { StationCoordinates } from '../../domain/value_objects/coordinates';
import { StationDistance } from '../../domain/value_objects/distance';
import { jsonToStation } from './mapper';
import * as csvParser from 'csv-parser';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CsvStationRepository implements StationRepository {
  constructor(@Inject('CSV_STATIONS') private stations: Array<Station>) {}

  async findNearby(
    coordinates: StationCoordinates,
    distance: StationDistance,
  ): Promise<Station[]> {
    // For another repository we could use a database query instead calculating the distance manually
    return this.stations.filter((station) => {
      return distance.gte(station.coordinates.distance(coordinates));
    });
  }

  static parseCsv(file_name: string): Promise<Array<Station>> {
    return new Promise((resolve, reject) => {
      const stations = [];
      createReadStream(file_name)
        .pipe(csvParser())
        .on('data', (product_data) =>
          stations.push(jsonToStation(product_data)),
        )
        .on('end', () => resolve(stations))
        .on('error', (error) => reject(error));
    });
  }
}

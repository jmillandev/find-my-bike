import { Module } from '@nestjs/common';
import { HttpController } from './infrastructure/http/finder.controller';
import { StationFinder } from './application/find/finder';
import { CsvStationRepository } from './infrastructure/repositories/csv';
import { StationRepository } from './domain/repository';
import { join } from 'path';

@Module({
  controllers: [HttpController],
  providers: [
    StationFinder,
    {
      provide: StationRepository,
      useClass: CsvStationRepository,
    },
    {
      provide: 'CSV_STATIONS',
      useFactory: async () => {
        return CsvStationRepository.parseCsv(
          join(__dirname, '..', 'storage', 'mibici_2024_01.csv'),
        );
      },
    },
  ],
})
export class StationsModule {}

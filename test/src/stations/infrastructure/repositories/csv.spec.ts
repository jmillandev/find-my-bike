import { Station } from '../../../../../src/stations/domain/entity';
import { StationRepository } from '../../../../../src/stations/domain/repository';
import { StationCoordinates } from '../../../../../src/stations/domain/value_objects/coordinates';
import { StationDistance } from '../../../../../src/stations/domain/value_objects/distance';
import { StationLocation } from '../../../../../src/stations/domain/value_objects/location';
import { StationName } from '../../../../../src/stations/domain/value_objects/name';
import {
  StationStatus,
  StationStatuses,
} from '../../../../../src/stations/domain/value_objects/status';
import { CsvStationRepository } from '../../../../../src/stations/infrastructure/repositories/csv';

describe('CsvStationRepository', () => {
  let repository: StationRepository;

  beforeEach(async () => {
    const products = await CsvStationRepository.parseCsv(
      './src/storage/mibici_2024_01.csv',
    );
    repository = new CsvStationRepository(products);
  });

  it('should return an empty list of stations', async () => {
    const coordinates = new StationCoordinates({
      latitude: 10.5082346,
      longitude: -66.9218495,
    });
    const distance = new StationDistance(1000);
    const stations = await repository.findNearby(coordinates, distance);

    expect(stations).toEqual([]);
  });

  it('should return a list of stations', async () => {
    const expected_station = new Station(
      new StationName('(GDL-002) C. Colonias  / Av.  Ni�os h�roes'),
      new StationCoordinates({ latitude: 20.667228, longitude: -103.366 }),
      new StationStatus(StationStatuses.ACTIVE),
      new StationLocation('POL�GONO CENTRAL'),
    );
    const coordinates = new StationCoordinates({
      latitude: 20.666378,
      longitude: -103.34882,
    });

    const distance = new StationDistance(1800);
    const stations = await repository.findNearby(coordinates, distance);

    expect(stations).toContainEqual(expected_station);
  });
});

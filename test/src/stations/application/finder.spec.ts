import { StationFinder } from '../../../../src/stations/application/find/finder';
import { StationRepositoryMock } from '../__mocks__/repository';
import { Station } from '../../../../src/stations/domain/entity';
import {
  StationStatus,
  Statuses,
} from '../../../../src/stations/domain/value_objects/status';
import { StationName } from '../../../../src/stations/domain/value_objects/name';
import { StationCoordinates } from '../../../../src/stations/domain/value_objects/coordinates';
import { StationLocation } from '../../../../src/stations/domain/value_objects/location';
import { faker } from '@faker-js/faker';

describe('CreatorService', () => {
  let repository: StationRepositoryMock;
  let finder: StationFinder;

  beforeEach(async () => {
    repository = new StationRepositoryMock();
    finder = new StationFinder(repository);
  });
  const latitude = faker.number.float({ min: -90, max: 90 });
  const longitude = faker.number.float({ min: -180, max: 180 });
  const distance = faker.number.int({ max: 1_000 });

  it('should return an empty list of stations', async () => {
    const stations = await finder.call(latitude, longitude, distance);

    expect(stations).toEqual([]);
  });

  it('should return a list of stations', async () => {
    const expected_stations = [
      new Station(
        new StationName('Station 1'),
        new StationCoordinates({ latitude: 40.416775, longitude: -3.70379 }),
        new StationStatus(Statuses.ACTIVE),
        new StationLocation('Madrid'),
      ),
      new Station(
        new StationName('Station 2'),
        new StationCoordinates({ latitude: 41.416775, longitude: -6.70379 }),
        new StationStatus(Statuses.ACTIVE),
        new StationLocation('Madrid'),
      ),
    ];
    repository.returnFindNearby(expected_stations);
    const stations = await finder.call(latitude, longitude, distance);

    expect(stations).toEqual(expected_stations);
  });
});

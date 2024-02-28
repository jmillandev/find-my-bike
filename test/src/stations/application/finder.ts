import { StationFinder } from 'src/stations/application/finder';
import { StationRepositoryMock } from '../__mocks__/repository';
import { StationRepository } from 'src/stations/domain/repository';

describe('CreatorService', () => {
  let repository: StationRepository;
  let finder: StationFinder;

  beforeEach(async () => {
    repository = new StationRepositoryMock();
    finder = new StationFinder(repository);
  });

  it('should dont find any station', async () => {
    const latitude = 40.416775;
    const longitude = -3.70379;
    const distance = 1000;
    const stations = await finder.call(latitude, longitude, distance);

    expect(stations).toEqual([]);
  });

  it('should return a list of stations', async () => {
    const latitude = 40.416775;
    const longitude = -3.70379;
    const distance = 1000;
    const stations = await finder.call(latitude, longitude, distance);

    expect(stations).toEqual([
      {
        id: '1',
        name: 'station 1',
        address: 'address 1',
        free_bikes: 10,
        latitude: 40.416775,
        longitude: -3.70379,
      },
      {
        id: '2',
        name: 'station 2',
        address: 'address 2',
        free_bikes: 20,
        latitude: 40.416775,
        longitude: -3.70379,
      },
    ]);
  });

  it('should throw error if distance is too long', async () => {
    const latitude = 40.416775;
    const longitude = -3.70379;
    const distance = 10_000;

    await expect(finder.call(latitude, longitude, distance)).rejects.toThrow(
      'Distance is too long',
    );
  });

  it('should throw error with a invalid latitud', async () => {
    const latitude = 40.416775;
    const longitude = -3.70379;
    const distance = 1_000;
    await expect(finder.call(latitude, longitude, distance)).rejects.toThrow(
      'Invalid latitude',
    );
  });

  it('should throw error with a invalid longitude', async () => {
    const latitude = 40.416775;
    const longitude = -3.70379;
    const distance = 1_000;
    await expect(finder.call(latitude, longitude, distance)).rejects.toThrow(
      'Invalid longitude',
    );
  });
});

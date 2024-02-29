import { faker } from '@faker-js/faker';
import { StationDistance } from '../../../../../src/stations/domain/value_objects/distance';
import { InvalidArgument } from '../../../../../src/shared/domain/errors/invalid_argument';

describe('StationDistance', () => {
  it('should throw error if distance is negative', () => {
    const distance = faker.number.float({ max: -1, min: -1_000 });
    expect(() => new StationDistance(distance)).toThrow(
      new InvalidArgument('Distance should be a positive number'),
    );
  });
});

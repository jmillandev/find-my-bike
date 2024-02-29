import { faker } from '@faker-js/faker';
import { StationDistance } from '../../../../../src/stations/domain/value_objects/distance';
import { InvalidArgument } from '../../../../../src/shared/domain/errors/invalid_argument';

describe('StationDistance', () => {
  it('should throw error if distance is not an integer', () => {
    const distance = faker.number.float();
    expect(() => new StationDistance(distance)).toThrow(
      new InvalidArgument('Distance should be an integer'),
    );
  });
});

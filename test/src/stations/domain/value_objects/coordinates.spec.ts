import { faker } from '@faker-js/faker';
import { StationCoordinates } from '../../../../../src/stations/domain/value_objects/coordinates';
import { InvalidArgument } from '../../../../../src/shared/domain/errors/invalid_argument';

describe('StationCoordinates', () => {
  describe('Latitude', () => {
    const longitude = faker.number.float({ min: -180, max: 180 });
    const expected_error = new InvalidArgument(
      'Latitude must be between -90 and 90 degrees',
    );
    it('should throw error when latitude is greater than 90', () => {
      const latitude = faker.number.float({ min: 91, max: 360 });
      expect(() => new StationCoordinates({ latitude, longitude })).toThrow(
        expected_error,
      );
    });

    it('should throw error when latitude is less than -90', () => {
      const latitude = faker.number.float({ min: -360, max: -91 });
      expect(() => new StationCoordinates({ latitude, longitude })).toThrow(
        expected_error,
      );
    });

    it('should throw error if latitude is not provided', () => {
      expect(
        () => new StationCoordinates({ latitude: null, longitude }),
      ).toThrow(new InvalidArgument('Latitude must be a number'));
    });
  });

  describe('Longitude', () => {});
  const latitude = faker.number.float({ min: -90, max: 90 });
  const expected_error = new InvalidArgument(
    'Longitude must be between -180 and 180 degrees',
  );
  it('should throw error when longitude is greater than 180', () => {
    const longitude = faker.number.float({ min: 181, max: 360 });
    expect(() => new StationCoordinates({ latitude, longitude })).toThrow(
      expected_error,
    );
  });

  it('should throw error when longitude is less than -180', () => {
    const longitude = faker.number.float({ min: -360, max: -181 });
    expect(() => new StationCoordinates({ latitude, longitude })).toThrow(
      expected_error,
    );
  });

  it('should throw error if longitude is not provided', () => {
    expect(() => new StationCoordinates({ latitude, longitude: null })).toThrow(
      new InvalidArgument('Longitude must be a number'),
    );
  });
});

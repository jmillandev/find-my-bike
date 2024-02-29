import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('StationController(Finder) (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /stations', () => {
    it('Success Response(Happy Path)', () => {
      return request(app.getHttpServer())
        .get('/stations')
        .query({ latitude: 20.666378, longitude: -103.34882, distance: 0 })
        .expect(200)
        .expect([
          {
            name: '(GDL-001) C. Epigmenio Glez./ Av. 16 de Sept.',
            coordinates: { latitude: 20.666378, longitude: -103.34882 },
            status: 'IN_SERVICE',
            location: 'POL�GONO CENTRAL',
          },
        ]);
    });

    it('Fail Response(Invalid Latitude)', () => {
      return request(app.getHttpServer())
        .get('/stations')
        .query({ latitude: 'invalid', longitude: -103.34882, distance: 0 })
        .expect(422)
        .expect({
          statusCode: 422,
          message: 'Latitude must be a number',
        });
    });
  });
});

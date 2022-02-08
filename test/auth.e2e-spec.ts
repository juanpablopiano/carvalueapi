import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Athentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const emailOrig = 'test2@email.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: emailOrig, password: 'test1' })
      .expect(201)
      .then(res => {
        const { id, email } = res.body;

        expect(id).toBeDefined();

        expect(email).toBe(emailOrig);
      });
  });

  it('handles a signup request', () => {
    const emailOrig = 'test2@email.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: emailOrig, password: 'test1' })
      .expect(201)
      .then(res => {
        const { id, email } = res.body;

        expect(id).toBeDefined();

        expect(email).toBe(emailOrig);
      });
  });
});

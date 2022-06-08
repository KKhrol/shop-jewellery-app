import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Logging with Jwt Authentication (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Authentication with JWT', () => {
    it('authenticates user with valid credentials and provides a jwt token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'Kkhrol1', password: 'Password_123' })
        .expect(200);
      jwtToken = response.body.access_token;
      console.log(jwtToken);
      expect(jwtToken).toMatch(
        /^Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      );
    }, 10000);

    it('fails to authenticate user with an incorrect password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'Kkhrol1', password: 'wrong' })
        .expect(401);

      expect(response.body.accessToken).not.toBeDefined();
    });

    it('fails to authenticate user that does not exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'notExistingUser', password: 'Password_123' })
        .expect(401);

      expect(response.body.accessToken).not.toBeDefined();
    });
  });

  describe('Geting protected items', () => {
    it('GETs and gives items (subjects) to authenticated user with role USER', async () => {
      const response = await request(app.getHttpServer())
        .get('/subjects')
        .set('Authorization', jwtToken)
        .expect(200);

      const data = response.body.data;
      expect(data).toBeDefined();
    });
    it('does not give items (users) to authenticated user with role USER (role needed - ADMIN)', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', jwtToken)
        .expect(403);
      expect(response.body.data).not.toBeDefined();
    });

    it('/POSTs items (subjects) created by authenticated user with role USER', () => {
      return request(app.getHttpServer())
        .post('/subjects')
        .set('Authorization', jwtToken)
        .send({
          subjectName: 'English',
          direction: 'Foreign Languages',
          managerId: '47',
        })
        .expect(201);
    });
  });
});

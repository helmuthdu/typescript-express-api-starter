import * as supertest from 'supertest';
import { server } from '../../index';

describe('ping route', () => {
  test('should return pong', (done) => {
    supertest(server)
      .get('/api/ping')
      .end((err: any, res: supertest.Response) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toBe('pong');
          done();
        }
      });
  });
});

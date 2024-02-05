import request from 'supertest';
import { testServer } from '../../test-server';

describe('Test on Routes', () => {

  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  test('Should return todos api/todos', async () => {
    
    await request(testServer.app)
      .get('/api/v1/todos')
      .expect(200);

  });

});
import request from 'supertest';
import { testServer } from '../../test-server';
import prisma from '../../../src/presentation/todos/data/postgres';

describe('Test on Routes', () => {

  const todos = [
    { title: 'Test todo 1' },
    { title: 'Test todo 2' },
  ];

  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  test('Should return todos api/todos', async () => {

    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: todos
    });
    
    const { body } = await request(testServer.app)
      .get('/api/v1/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);

    body.forEach((todo: any, index: number) => {
      expect(todo).toEqual({
        id: expect.any(String),
        title: todos[index].title,
        completedAt: null,
      });
    });
    
  });

});
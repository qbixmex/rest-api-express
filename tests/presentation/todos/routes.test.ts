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

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterAll(() => {
    testServer.close();
  });

  test('Should return todos api/todos', async () => {

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
        id: todo.id,
        title: todo.title,
        completedAt: todo.completedAt,
      });
    });
    
  });

  test('Should return a todo api/todos/:id', async () => {

    const todo = await prisma.todo.create({
      data: todos[0]
    });

    const { body } = await request(testServer.app)
      .get(`/api/v1/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      title: todo.title,
      completedAt: todo.completedAt,
    });

  });

  test('Should return an error if todo id is not a valid uuid on api/todos/:id', async () => {

    await prisma.todo.create({
      data: todos[0]
    });

    const testId = 'abc123';

    const { body } = await request(testServer.app)
      .get(`/api/v1/todos/${testId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Invalid id: ${testId} !`
    });

  });

  test('Should return an error if todo id doesn\'t exist on api/todos/:id', async () => {

    await prisma.todo.create({
      data: todos[0]
    });

    const testId = 'a3b21925-3854-451f-94b7-3ea86b45f9c1';

    const { body } = await request(testServer.app)
      .get(`/api/v1/todos/${testId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Todo with id: ${testId}, not found !`
    });

  });

  test('Should return create a new todo on api/todos', async () => {
    const response = await request(testServer.app)
      .post('/api/v1/todos')
      .send(todos[0])
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      title: todos[0].title,
      completedAt: null,
    });
  });

  test('Should return an error if no title were provided api/todos', async () => {
    const response = await request(testServer.app)
      .post('/api/v1/todos')
      .send({})
      .expect(400);

    expect(response.body).toEqual({
      error: 'title property is required !'
    });
  });

  test('Should return an error if no title is short api/todos', async () => {
    const response = await request(testServer.app)
      .post('/api/v1/todos')
      .send({ title: 'abc' })
      .expect(400);

    expect(response.body).toEqual({
      error: 'title must be greater than 8 characters !'
    });
  });

  test('Should update a todos on api/todos/:id', async () => {
    
    const todo = await prisma.todo.create({ data: todos[0] });

    const dataTest = {
      title: 'Test todo updated',
      completedAt: '2022-10-02T14:22:15.132Z'
    };

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${todo.id}`)
      .send(dataTest)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(String),
      title: dataTest.title,
      completedAt: dataTest.completedAt,
    });
  });

  test('Should update only the title at api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[1] });

    const dataTest = {
      title: 'Test title updated'
    };

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${todo.id}`)
      .send(dataTest)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(String),
      title: dataTest.title,
      completedAt: todo.completedAt,
    });
  });

  test('Should update only the completedAt at api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todos[1] });

    const dataTest = {
      completedAt: '2022-12-02T18:15:45.744Z'
    };

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${todo.id}`)
      .send(dataTest)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(String),
      title: todo.title,
      completedAt: dataTest.completedAt,
    });
  });

  test('Should return 400 response on update if id is not valid', async () => {
    await prisma.todo.create({ data: todos[1] });

    const fakeId = '123abc';

    const dataTest = {
      title: 'Test todo updated',
      completedAt: '2024-06-15T10:12:45.456Z'
    };

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${fakeId}`)
      .send(dataTest)
      .expect(400);

    expect(body).toEqual({
      error: `Todo id: ${fakeId}, is not valid uuid !`
    });
  });

  test('Should return 404 response on update if todo not found', async () => {
    await prisma.todo.create({ data: todos[1] });

    const fakeId = 'a3b21925-3854-451f-94b7-3ea86b45f9c1';

    const dataTest = {
      title: 'Test todo updated',
      completedAt: '2022-12-02T18:15:45.744Z'
    };

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${fakeId}`)
      .send(dataTest)
      .expect(404);

    expect(body).toEqual({
      error: `Todo with id: ${fakeId}, not found !`
    });
  });

  test('Should return 400 response on update if no data was submitted', async () => {
    const todo = await prisma.todo.create({ data: todos[1] });

    const dataTest = {};

    const { body } = await request(testServer.app)
      .patch(`/api/v1/todos/${todo.id}`)
      .send(dataTest)
      .expect(400);

    expect(body).toEqual({
      error: 'title and completedAt are mandatory !'
    });
  });

  test('Should return 400 response on delete if not a valid UUID', async () => {
    const testId = '123abc';

    const { body } = await request(testServer.app)
      .delete(`/api/v1/todos/${testId}`)
      .expect(400);

    expect(body).toEqual({
      error: `Todo id: ${testId}, is not valid uuid !`
    });
  });

  test('Should return 404 response on delete if not found', async () => {
    const testId = 'a3b21925-3854-451f-94b7-3ea86b45f9c1';

    const { body } = await request(testServer.app)
      .delete(`/api/v1/todos/${testId}`)
      .expect(404);

    expect(body).toEqual({
      error: `Todo with id: ${testId}, not found !`
    });
  });

  test('Should delete a todo on delete', async () => {
    const todo = await prisma.todo.create({ data: todos[1] });

    const { body } = await request(testServer.app)
      .delete(`/api/v1/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      message: `Todo with id: ${todo.id} deleted successfully !`,
    });
  });
});
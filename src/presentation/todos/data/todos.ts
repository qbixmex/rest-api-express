export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const todos: Todo[] = [
  {
    id: '2cbbcbbf-f89c-43db-ad65-2e0f34f075e2',
    title: 'Go to the GYM',
    done: true,
    createdAt: new Date('2024-01-12T14:02:10.135Z'),
    updatedAt: new Date('2024-01-12T14:08:35.455Z'),
  },
  {
    id: '2759c2c3-30e9-42e5-880e-c5542baefe84',
    title: 'Go to the Job',
    done: true,
    createdAt: new Date('2024-01-12T15:15:06.717Z'),
    updatedAt: new Date('2024-01-12T15:18:35.132Z'),
  },
  {
    id: '7f1e4c4a-673c-483b-a743-721de03f119c',
    title: 'Finish Homework',
    done: false,
    createdAt: new Date('2024-01-12T15:25:25.243Z'),
    updatedAt: new Date('2024-01-12T15:28:35.432Z'),
  },
];
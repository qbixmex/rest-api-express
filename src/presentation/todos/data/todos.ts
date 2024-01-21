export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const todos: Todo[] = [
  {
    id: 'b981e38f',
    title: 'Go to the GYM',
    done: true,
    createdAt: new Date('2024-01-12T14:02:10.135Z'),
    updatedAt: new Date('2024-01-12T14:08:35.455Z'),
  },
  {
    id: '8b2fc14e',
    title: 'Go to the Job',
    done: true,
    createdAt: new Date('2024-01-12T15:15:06.717Z'),
    updatedAt: new Date('2024-01-12T15:18:35.132Z'),
  },
  {
    id: 'ce0b4af2',
    title: 'Finish Homework',
    done: false,
    createdAt: new Date('2024-01-12T15:25:25.243Z'),
    updatedAt: new Date('2024-01-12T15:28:35.432Z'),
  },
];
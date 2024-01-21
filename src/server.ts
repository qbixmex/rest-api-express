import express, { Request, Response } from 'express';
import path from 'path';

type Options = {
  PORT: number;
  PUBLIC_PATH: string;
};

class Server {
  private app = express();
  private readonly PORT: number;
  private readonly PUBLIC_PATH: string;

  constructor(options: Options) {
    this.PORT = options.PORT;
    this.PUBLIC_PATH = options.PUBLIC_PATH;
  }

  async start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running at port: ${this.PORT}`);
    });

    //* Middlewares
    this.app.use('/api/todos', (_request: Request, response: Response) => {
      return response.json([
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
      ]);
    });

    //* Single Page Application (SPA) like React, Vue, Angular, Solid, Qwik, etc.
    this.app.use(express.static('public'));

    this.app.get('*', (_request: Request, response: Response) => {
      const indexPath = path.join(__dirname, `../${this.PUBLIC_PATH}/index.html`);
      console.log(indexPath)
      response.sendFile(indexPath);
    });
  }
}

export default Server;

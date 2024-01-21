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

    //* Public Folder
    this.app.use(express.static('public'));

    this.app.get('*', (_request: Request, response: Response) => {
      const indexPath = path.join(__dirname, `../${this.PUBLIC_PATH}/index.html`);
      console.log(indexPath)
      response.sendFile(indexPath);
    });
  }
}

export default Server;

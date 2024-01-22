import express, { Request, Response, Router } from 'express';
import path from 'path';

type Options = {
  port: number;
  router: Router;
  public_path: string;
};

class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly public_path: string;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.router;
    this.public_path = options.public_path;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port: ${this.port}`);
    });

    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(this.routes);

    //* Single Page Application (SPA) like React, Vue, Angular, Solid, Qwik, etc.
    this.app.use(express.static('public'));

    this.app.get('*', (_request: Request, response: Response) => {
      const indexPath = path.join(__dirname, `../${this.public_path}/index.html`);
      console.log(indexPath)
      response.sendFile(indexPath);
    });
  }
}

export default Server;

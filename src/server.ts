import express, { Request, Response } from 'express';
import path from 'path';

class Server {
  private app = express();

  constructor(private readonly PORT: number) {}

  async start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running at port: ${this.PORT}`);
    });

    //* Middlewares

    //* Public Folder
    this.app.use(express.static('public'));

    this.app.get('*', (_request: Request, response: Response) => {
      const indexPath = path.join(__dirname, '../public/index.html');
      console.log(indexPath)
      response.sendFile(indexPath);
    });
  }
}

export default Server;

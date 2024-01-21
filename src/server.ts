import express from 'express';

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
  }
}

export default Server;

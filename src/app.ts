import envs from './config/envs';
import AppRouter from './presentation/router';
import Server from './presentation/server';

const main = async () => {
  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes,
    public_path: envs.PUBLIC_PATH,
  });
  server.start();
};

(() => main())();

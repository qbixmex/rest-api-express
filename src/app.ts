import ENVS from './config/envs';
import AppRouter from './presentation/router';
import Server from './presentation/server';

const main = async () => {
  const server = new Server({
    port: ENVS.PORT,
    router: AppRouter.routes,
    public_path: ENVS.PUBLIC_PATH,
  });
  server.start();
};

(() => {
  main();
})();

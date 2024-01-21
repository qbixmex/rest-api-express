import ENVS from './config/envs';
import AppRoutes from './presentation/routes';
import Server from './presentation/server';

const main = async () => {
  const server = new Server({
    port: ENVS.PORT,
    router: AppRoutes.routes,
    public_path: ENVS.PUBLIC_PATH,
  });
  server.start();
};

(() => {
  main();
})();

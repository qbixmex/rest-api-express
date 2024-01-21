import ENVS from './config/envs';
import Server from './server';

const main = async () => {
  const server = new Server({
    PORT: ENVS.PORT,
    PUBLIC_PATH: ENVS.PUBLIC_PATH
  });
  server.start();
};

(() => {
  main();
})();

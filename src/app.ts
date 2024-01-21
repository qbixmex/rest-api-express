import Server from './server';

const main = async () => {
  const server = new Server(3000);
  server.start();
};

(() => {
  main();
})();

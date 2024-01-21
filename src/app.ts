import http from 'http';

const PORT = 8000;

const server = http.createServer((request, response) => {
  response.write('Server is running\n');
  response.end();
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

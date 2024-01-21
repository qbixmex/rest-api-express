import http from 'node:http';
import fs from 'node:fs';

const PORT = 8000;

const server = http.createServer((request, response) => {
  // * Request as HTML
  // response.writeHead(200, { 'Content-Type': 'text/html' });
  // response.write(`<h1>URL ${request.url}</h1>`);
  // response.end();

  // * Request as JSON
  // const data = {
  //   name: 'Daniel Gonzalez',
  //   age: 24,
  //   position: 'Full Stack Developer',
  //   address: {
  //     street: '222',
  //     city: 'Langley',
  //     province: 'British Columbia',
  //     code: 'V2Y 2XY',
  //   },
  // };

  // response.writeHead(200, { 'Content-Type': 'application/json' });
  // response.write(JSON.stringify(data));
  // response.end();

  if (request.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(htmlFile);
    response.end();
  } else {
    const htmlFile = fs.readFileSync('./public/404.html', 'utf-8');
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(htmlFile);
    response.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

import fs from 'node:fs';
import http2 from 'node:http2';

const PORT = 8000;

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (request, response) => {

  console.log(request.url);
  
  try {
    if (request.url === '/') {
      const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
      response.writeHead(200, { 'Content-Type': 'text/html', });
      response.write(htmlFile);
      response.end();
      return;
    }

    if (request.url?.endsWith('.png')) {
      response.writeHead(200, { 'Content-Type': 'image/png' });
    }
  
    if (request.url?.endsWith('.css')) {
      response.writeHead(200, { 'Content-Type': 'text/css', });
    }
  
    if (request.url?.endsWith('.js')) {
      response.writeHead(200, { 'Content-Type': 'application/javascript', });
    }
  
    const responseContent = fs.readFileSync(`./public${request.url}`, 'utf-8');
    response.write(responseContent);
    response.end();

  } catch (error) {
    const htmlFile = fs.readFileSync('./public/404.html', 'utf-8');
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(htmlFile);
    response.end();
  }

});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

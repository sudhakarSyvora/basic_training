const http = require('http');
const fs = require('fs');
const path = require('path');
 
const jsonFilePath = path.join(__dirname, 'data.json');

let content = fs.readFileSync(jsonFilePath);
let data = JSON.parse(content);
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/content') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else if (req.method === 'POST' && req.url === '/content') {
    let body = '';
    req.on('data', chunk => {
      console.log(chunk.toString())
      body += chunk.toString();
    });
    req.on('end', () => {
      data = JSON.parse(body);
      fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Content updated successfully');
        }
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { unescape } = require('querystring');

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png"
};

const hostname = '127.0.0.1';
const port = 1337;

const server = http.createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading' + uri);
    var stats;
});

try{
    stats = fs.lstatSync(fileName);
  } catch(e) {
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
    return;
  }

if(stats.isFile()){
var mimeType = mimeType[path.extname(fileName).split(".").reverse()[0]];
res.writeHead(200, {'Content-type': mimeType});

var fileStream = fs.createReadStream(fileName);
fileStream.pipe(res);
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
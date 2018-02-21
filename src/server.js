const http = require('http');
const url = require('url');
// const query = require('querystring');

const contentHandler = require('./contentResponses');
const jsonHandler = require('./jsonResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
// const onPost = (request, response, parsedUrl) => {

// };

const onGet = (request, response, parsedUrl) => {
  const extname = parsedUrl.path.split('.')[1];

  if (extname && extname !== undefined) {
    switch (extname) {
      case 'html':
        contentHandler.getPage(parsedUrl.path, response, 'text/html');
        break;
      case 'css':
        contentHandler.getPage(parsedUrl.path, response, 'text/css');
        break;
      case 'js':
        contentHandler.getPage(parsedUrl.path, response, 'application/javascript');
        break;
      case 'ico':
        break;
      default:
        break;
    }
  } else {
    switch (parsedUrl.pathname) {
      case '/getImages':
        jsonHandler.getImages(request, response);
        break;
      case '/':
        contentHandler.getPage(parsedUrl.pathname, response, 'text/html');
        break;
      default:
        // console.log(parsedUrl);
        break;
    }
  }
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'GET':
    case 'HEAD':
      onGet(request, response, parsedUrl);
      break;
    case 'POST':
      // onPost(request, response, parsedUrl);
      break;
    default:
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);

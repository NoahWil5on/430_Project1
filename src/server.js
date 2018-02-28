// import tools
const http = require('http');
const url = require('url');
const query = require('querystring');

// import other js files
const contentHandler = require('./contentResponses');
const jsonHandler = require('./jsonResponses');

// set port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// run when a post occurs
const onPost = (request, response, parsedUrl) => {
  // make sure it is one of the predifined posts
  if (parsedUrl.pathname !== '/addImage' &&
    parsedUrl.pathname !== '/shareImage' &&
    parsedUrl.pathname !== '/trashImage') return;

  const res = response;
  const body = [];

  // mash together all our post data
  request.on('error', (e) => {
    console.dir(e);
    res.statusCode = 400;
    res.end();
  });
  request.on('data', (data) => {
    body.push(data);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    // run the right function based on which post we recieved
    switch (parsedUrl.pathname) {
      case '/addImage':
        jsonHandler.addImage(res, bodyParams);
        break;
      case '/shareImage':
        jsonHandler.shareImage(res, bodyParams);
        break;
      case '/trashImage':
        jsonHandler.trashImage(res, bodyParams);
        break;
      default:
        break;
    }
  });
};
// on a get or Head request
const onGet = (request, response, parsedUrl) => {
  const extname = parsedUrl.path.split('.')[1];

  // if it has a file extension
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
        //404
      default:
        contentHandler.getPage(parsedUrl.pathname, response, 'text/html');
        break;
    }
  } else {
    // check if it belongs as a get
    switch (parsedUrl.pathname) {
      case '/getImages':
        jsonHandler.getImages(request, response);
        break;
      case '/getMyImages':
        jsonHandler.getMyImages(request, response);
        break;
      case '/getSharedImages':
        jsonHandler.getSharedImages(request, response);
        break;
      case '/':
        contentHandler.getPage(parsedUrl.pathname, response, 'text/html');
        break;
        //404
      default:
        contentHandler.getPage(parsedUrl.pathname, response, 'text/html');
        break;
    }
  }
};
//when a request comes in, decide where it's routed to
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  switch (request.method) {
    case 'GET':
    case 'HEAD':
      onGet(request, response, parsedUrl);
      break;
    case 'POST':
      onPost(request, response, parsedUrl);
      break;
    default:
      break;
  }
};

//create the server and listen to it
http.createServer(onRequest).listen(port);

console.log(`Listening on port ${port}`);

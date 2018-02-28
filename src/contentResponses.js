const fs = require('fs');

//get the content we asked for
function getPage(req, response, contentType) {
  let request = req;
  if (request === '/') request = '/index.html';
  let page;

  try {
  //try and pull the static file    
    page = fs.readFileSync(`${__dirname}/../client${request}`);

  //404
  } catch (err) {
    page = fs.readFileSync(`${__dirname}/../client/error.html`);
    //write 404 page
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
    return;
  }

  //write the document
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(page);
  response.end();
}

module.exports.getPage = getPage;

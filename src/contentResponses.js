const fs = require('fs');

function getPage(req, response, contentType) {
  let request = req;
  if (request === '/') request = '/index.html';
  let page;

  try {
    page = fs.readFileSync(`${__dirname}/../client${request}`);
  } catch (err) {
    return;
  }

  response.writeHead(200, { 'Content-Type': contentType });
  response.write(page);
  response.end();
}

module.exports.getPage = getPage;

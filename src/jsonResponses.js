const GoogleImages = require('google-images');

const respondJSON = (response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  switch (status) {
    case 404:
      response.write(JSON.stringify({ message: 'The page you are looking for was not found.' }));
      break;
    case 400:
      response.write(JSON.stringify({ message: 'Bad Request' }));
      break;
    case 204:
      break;
    default:
      response.write(JSON.stringify(object));
      break;
  }
  response.end();
};

const getJsonFromUrl = (p) => {
  const result = {};

  let path = p.split('?');
  if (path.length > 1) {
    path = path[1];
  } else {
    path = path[0];
  }


  path.split('&').forEach((part) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};

const getImages = (request, response) => {
  const client = new GoogleImages('005131928619784331791:hlv3ddtzs5k', 'AIzaSyDA70wFDAYmdUedKVDWkZf02bu21mdsHDw');
  const query = getJsonFromUrl(request.url).query;

  if (query.length < 1 || !query.length || query.length === undefined) {
    respondJSON(response, 400, {});
    return;
  }
  client.search(query).then((res) => {
    respondJSON(response, 200, res);
  }).catch((e) => {
    console.dir(e);
    respondJSON(response, 400, {});
  });
};

module.exports.getImages = getImages;

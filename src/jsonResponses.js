const GoogleImages = require('google-images');

const myImages = {};
const sharedImages = [];

// send a json object back to the client
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
      response.write(JSON.stringify(object));
      break;
    default:
      response.write(JSON.stringify(object));
      break;
  }
  response.end();
};
// take params from url and turn them into a json object
const getJsonFromUrl = (p) => {
  const result = {};

  const [path0, path1] = p.split('?');
  let path = p.split('?');
  if (path.length > 1) {
    path = path1;
  } else {
    path = path0;
  }

  path.split('&').forEach((part) => {
    const param = part.split('=');
    result[param[0]] = decodeURIComponent(param[1]);
  });
  return result;
};
// query google for top 10 results from specified image search
const getImages = (request, response) => {
  const client = new GoogleImages('005131928619784331791:hlv3ddtzs5k', 'AIzaSyDA70wFDAYmdUedKVDWkZf02bu21mdsHDw');
  const { query } = getJsonFromUrl(request.url);

  if (query.length < 1 || !query.length || query.length === undefined) {
    respondJSON(response, 400, {});
    return;
  }
  client.search(query).then((res) => {
    respondJSON(response, 200, res);
  }).catch((e) => {
    respondJSON(response, 400, { e });
  });
};
// get all liked images from specified user
const getMyImages = (request, response) => {
  const { user } = getJsonFromUrl(request.url);

  if (!myImages[user] || myImages[user] === undefined) {
    respondJSON(response, 404, {});
    return;
  }
  respondJSON(response, 200, myImages[user]);
};
// get all shared images between all users
const getSharedImages = (request, response) => {
  if (sharedImages === {}) {
    respondJSON(response, 404, {});
  } else {
    respondJSON(response, 200, sharedImages);
  }
};
// add a specified image to users list of liked images
const addImage = (response, body) => {
  if (!body.user || !body.url) {
    return respondJSON(response, 400, {});
  }
  let status = 201;
  if (myImages[body.user]) status = 204;
  else myImages[body.user] = [];

  myImages[body.user].push(body.url);

  return respondJSON(response, status, {});
};
// add a specified image to a list of all shared images between all shared users
const shareImage = (response, body) => {
  if (!body.user || !body.url) {
    return respondJSON(response, 400, {});
  }
  const status = 201;

  const shareData = {
    user: body.user,
    url: body.url,
  };

  sharedImages.push(shareData);

  return respondJSON(response, status, {});
};
// delete user specified image from 'database'
const trashImage = (response, body) => {
  if (!myImages[body.user] || myImages[body.user] === undefined) {
    respondJSON(response, 404, {});
    return;
  }
  let found = false;
  for (let i = 0; i < myImages[body.user].length; i++) {
    if (myImages[body.user][i] === body.url) {
      myImages[body.user].splice(i, 1);
      found = true;
      break;
    }
  }
  if (found) {
    respondJSON(response, 204, myImages[body.user]);
  } else {
    respondJSON(response, 400, myImages[body.user]);
  }
};

// export get requests
module.exports.getImages = getImages;
module.exports.getMyImages = getMyImages;
module.exports.getSharedImages = getSharedImages;

// export post requests
module.exports.addImage = addImage;
module.exports.shareImage = shareImage;
module.exports.trashImage = trashImage;

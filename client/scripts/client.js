/**
 *getImageUrl uses script from stackoverflow to parse the backgroundimage style
 * https://stackoverflow.com/questions/3098404/get-the-size-of-a-css-background-image-using-javascript
**/
const getImageURL = (e) => {
    return e.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
}
//either gets or creates a persistent user name in local storage
const getUser = () => {
    user = localStorage.getItem('ntw9049-430-project1');
    if(!user || user === undefined){
        user = Date.now().toString();
    }
    localStorage.setItem('ntw9049-430-project1', user);
    return user;
}
//handles all responses with their status codes
const handleResponse = (xhr, content) => {
    switch (xhr.status) {
        case 200:
            console.log('200: success');
            break;
        case 201:
            console.log('201: created');
            break;
        case 204:
            console.log('204: updated');
            break;
        case 400:
            console.log('400: bad request');
            break;
        case 404:
            console.log('404: resource not found');
            break;
        defualt:
            console.log(`${xhr.status}: status code not implemented by client`);
            break;
    };

    let data;

    //if there is no response data this step is skipped
    if(xhr.response && xhr.response !== undefined){
        data = JSON.parse(xhr.response);
    }
    //runs next function depending on 'content' param type
    switch (content) {
        case 'images':
            fillImages(data)
            break;
        case 'trashImage':
            getMyImages();
            break;
        default:
            break;
    }
}
//send shareImage post to server
const shareImage = (e) => {
    const imageSrc = getImageURL(e.parentElement.parentElement.parentElement);

    const user = getUser();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/shareImage');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'shareImage');
    const dataToSend = `url=${imageSrc}&user=${user}`;
    xhr.send(dataToSend);
    return false;
}
//send delete image post to server
const trashImage = (e) => {
    const imageSrc = getImageURL(e.parentElement.parentElement.parentElement);

    const user = getUser();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/trashImage');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'trashImage');
    const dataToSend = `url=${imageSrc}&user=${user}`;
    xhr.send(dataToSend);
    return false;
}
//set add image post to server
const addImage = (e) => {
    const imageSrc = getImageURL(e.parentElement.parentElement.parentElement);

    const user = getUser();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/addImage');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'addImage');
    const dataToSend = `url=${imageSrc}&user=${user}`;
    xhr.send(dataToSend);
    return false;
}
//send get image request to server
const doGetImages = (e, data) => {
    let action = data.getAttribute('action');
    const method = data.getAttribute('method');

    const query = document.querySelector('#search-field');

    const xhr = new XMLHttpRequest();

    let val;

    //if there is nothing in the query then stop running this method (you can't do a google search for nothing)
    if (!query.value || query.value === undefined || query.value.length < 1) {
        return;
    } else {
        val = query.value;
    }
    const dataToSend = `query=${query.value}`;

    action = `${action}?${dataToSend}`;

    xhr.open(method, action);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'images');

    xhr.send();
    e.preventDefault();
    return false;
}
//sends request to server to get the images you have liked
const getMyImages = () => {
    user = getUser();

    const xhr = new XMLHttpRequest();

    const dataToSend = `user=${user}`;

    action = `/getMyImages?${dataToSend}`;

    xhr.open('GET', action);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'images');

    xhr.send();
    return false;
}
//send request to server to get all the images other users of shared
const getSharedImages = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/getSharedImages');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = () => handleResponse(xhr, 'images');

    xhr.send();
    return false;
}
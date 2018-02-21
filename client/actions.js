"use strict"

const view = (e) => {
    var imageSrc = e.parentElement.parentElement.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    window.location.href = imageSrc;
}
const fillImages = (data) => {
    let content = '';
    const gallery = document.getElementById('gallery-list');

    const innerList = 
    `<div class="image-options">
        <div class="image-view" onclick='view(this)'>
            <i class="material-icons">remove_red_eye</i>
        </div>
        <div class="image-social">
            <div class="image-like"><i class="medium material-icons">favorite</i></div>
            <div class="image-share"><i class="medium material-icons">share</i></div>
        </div>
    </div>`;

    data.forEach(image => {
        content = `${content}<li style='background-image: url("${image.url}")' onerror='this.style.display = "none"'>
            ${innerList}
        </li>`;
    });

    gallery.innerHTML = content;
}
const handleResponse = (xhr, content) => {
    //const content = document.querySelector('#content');

    // switch (xhr.status) {
    //     case 200:
    //         content.innerHTML = `<b>Success</b>`;
    //         break;
    //     case 201:
    //         content.innerHTML = `<b>Create</b>`;
    //         break;
    //     case 204:
    //         content.innerHTML = `<b>Updated (No Content)</b>`;
    //         break;
    //     case 400:
    //         content.innerHTML = `<b>Bad Request</b>`;
    //         break;
    //     case 404:
    //         content.innerHTML = `<b>Resource not found</b>`;
    //         break;
    //     defualt:
    //         content.innerHTML = `Error code not implemented by client.`;
    //         break;
    // };

    const data = JSON.parse(xhr.response);
    switch (content) {
        case 'images':
            fillImages(data)
            break;
        default:
            break;
    }
}
const doGetImages = (e, data) => {
    let action = data.getAttribute('action');
    const method = data.getAttribute('method');

    const query = document.querySelector('#search-field');

    const xhr = new XMLHttpRequest();

    let val;
    if (!query.value || query.value === undefined || query.value.length < 1) {
        val = " "
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
const init = () => {
    var input = document.getElementById('search-field');
    input.focus();
    input.select();

    let imageForm = document.getElementById('image-form');
    const getImages = (e) => { doGetImages(e, imageForm); };
    imageForm.addEventListener('submit', getImages);
}
window.onload = init;
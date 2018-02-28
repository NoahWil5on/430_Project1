"use strict"

//when getImages is called this will eventually populate the gallery
const fillImages = (data) => {
    let content = '';
    const gallery = document.getElementById('gallery-list');

    const innerList = 
    `<div class="image-options">
        <div class="image-view" onclick='view(this)'>
            <i class="material-icons">remove_red_eye</i>
        </div>
        <div class="image-social">
            <div class="image-like" onclick='addImage(this)'><i class="medium material-icons">favorite</i></div>
            <div class="image-share" onclick='shareImage(this)'><i class="medium material-icons">share</i></div>
        </div>
    </div>`;

    //loop through the images and add the styalized images to the gallery
    data.forEach(image => {
        content = `${content}<li style='background-image: url("${image.url}")' onerror='this.style.display = "none"'>
            ${innerList}
        </li>`;
    });

    gallery.innerHTML = content;
}
//set up even listener to get images from google when the form button is pressed
const init = () => {
    var submit = new Event('submit');

    var input = document.getElementById('search-field');
    input.focus();
    input.select();

    let imageForm = document.getElementById('image-form');
    const getImages = (e) => { doGetImages(e, imageForm); };
    imageForm.addEventListener('submit', getImages);

    imageForm.dispatchEvent(submit);
}
window.onload = init;
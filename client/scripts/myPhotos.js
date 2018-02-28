"use strict"

//when getMyImages is called this will eventually populate the gallery
const fillImages = (data) => {
    let content = '';
    const gallery = document.getElementById('gallery-list');

    const innerList =
        `<div class="image-options">
        <div class="image-view" onclick='view(this)'>
            <i class="material-icons">remove_red_eye</i>
        </div>
        <div class="image-social">
            <div class="image-trash" onclick='trashImage(this)'><i class="medium material-icons">delete</i></div>
            <div class="image-share" onclick='shareImage(this)'><i class="medium material-icons">share</i></div>
        </div>
    </div>`;

    //loop through the data and set up gallery images
    for (var i = 0; i < data.length; i++) {
        content = `${content}<li style='background-image: url("${data[i]}")' onerror='this.style.display = "none"'>${innerList}</li>`;
    }
    gallery.innerHTML = content;
}
//call getMyImages when the page is loaded
const init = () => {
    getMyImages();
}
window.onload = init;
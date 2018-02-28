"use strict"

//when getSharedImages is called this will eventually populate the gallery
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
        </div>
    </div>`;

    //loop through list and create gallery images
    for (var i = 0; i < data.length; i++) {
        content = `${content}<li style='background-image: url("${data[i].url}")' onerror='this.style.display = "none"'>${innerList}</li>`;
    }
    gallery.innerHTML = content;
}
//call getSharedImages when page loads
const init = () => {
    getSharedImages();
}
window.onload = init;
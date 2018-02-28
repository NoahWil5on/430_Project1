"use strict"
//when an image is clicked we go to the orginal source of image to view it
const view = (e) => {
    var imageSrc = getImageURL(e.parentElement.parentElement);
    window.location.href = imageSrc;
}
//open or close menu depending when the menu button was clicked
const toggleMenu = () => {
    var main = document.getElementById('main');
    var mainClass = main.getAttribute('class');
    if('closed-menu' === mainClass){
        main.removeAttribute('class');
        main.setAttribute('class', 'open-menu');
    }else{
        main.removeAttribute('class');
        main.setAttribute('class', 'closed-menu');
    }
}
//close the menu if the whole page is clicked (not the menu button, this allows the user to more easily close the menu)
const closeMenu = () => {
    var main = document.getElementById('main');
    var mainClass = main.getAttribute('class');
    if('open-menu' === mainClass){
        main.removeAttribute('class');
        main.setAttribute('class', 'closed-menu');
    }
}
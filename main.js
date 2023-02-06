'use strict';

const sliderImages = document.querySelectorAll('.js-slide-in');

function debounce(func, timeToWait, immediate = true) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        const later =  () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, timeToWait);
        if (callNow) func.apply(context, args);
    };
}


function checkSlide() {
    //Loop over every single image to figure out where the image needs to be shown
    for(const sliderImage of sliderImages){
        //ScrollY equals the starter point of the window, the innerHeight responds to the exact height we are at in the window
        //We want to show 50% of the image when hitting 50% of its height
        const slideInAt = (window.scrollY + window.innerHeight) - ( sliderImage.height / 2 );
        //offsetTop indicates how far the top of the image is from the top of the window
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        //Boolean to check if we have arrived to at least 50% of the image height
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        //Boolean to check if we have past the image
        const isNotScrolledPast = window.scrollY < imageBottom;
        if(isHalfShown && isNotScrolledPast){
            sliderImage.classList.add('active');
        }else{
            sliderImage.classList.remove('active')
        }
    }
}

//To run the handle function every x seconds
window.addEventListener('scroll', debounce(checkSlide, 20));
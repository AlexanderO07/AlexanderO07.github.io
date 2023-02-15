let images = document.querySelectorAll('.image');
let slider = document.querySelector('#image-track');
let sliderWidth = slider.getBoundingClientRect();

let imageWidth;
let current = 0;
let prey = 0;
let ease = .05

function lerp(start, end, t) {
    return start* (1-t) + end * t;
}
function setTransform(el, transform) {
    el.style.transform = transform;
}
function init() {
    imageWidth = sliderWidth/images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}
function animate() {
    current = parseFloat(lerp(current, prey, ease)).toFixed(2);
    prey = window.scrollY;
    setTransform.slider =`translateX(=${current}px))`
    requestAnimationFrame(animate)
}


function animateImages(){
    let ratio = current / imageWidth;
    
}

init();
animate();
animateImages();
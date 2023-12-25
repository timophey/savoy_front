function initParallax(){
    var images = document.getElementsByClassName('image-transform');
    new simpleParallax(images,{
        delay: .3,
        transition: 'cubic-bezier(0,0,0,1)'
    });
}

document.addEventListener('DOMContentLoaded',initParallax);
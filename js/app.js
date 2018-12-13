

eventListeners();

function eventListeners() {

    //create new UI object 
    const ui = new UI();

    //hide preloader icon on page load
    window.addEventListener('load', function () {
        ui.hidePreloader();
    });

    //show navbar on clicking navBtn
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    });

    //video control on clicking on/off button 
    document.querySelector('.video__switch').addEventListener('click', function () {
        ui.videoControls();
    })
}

//constructor function
function UI() {

}

// hide preloader
UI.prototype.hidePreloader = function () {
    document.querySelector(".preloader").style.display = "none";
}

// show nav bar
UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav--show');
}

// control the video
UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video__switch-btn');
    let video = document.querySelector('.video__item');
    btn.classList.toggle('btnSlide');

    //toggle the video play/pause
    if (btn.classList.contains('btnSlide')) {
        video.pause();
    } else {
        video.play();
    }
}
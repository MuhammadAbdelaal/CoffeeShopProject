

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
    });

    // submit the form 
    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;
        let value = ui.checkEmpty(name, lastName, email);

        //if all of the values are submitted
        if (value) {

            ui.showFeedback('customer add to the list successfully', 'success');

            // create new customer object
            const customer = new Customer(name, lastName, email);

            //add customer div to the drink card list div
            const cardList = document.querySelector('.drink-card__list');
            cardList.innerHTML += ui.addCustomerDiv(customer.name, customer.lastname);

            //clear input fields after submitting the form
            ui.clearFields();
        } else {
            ui.showFeedback('some form values are empty', 'error');
        }
    });

}

//constructor function for UI objects
function UI() { }

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

// check if any one of the values is empty
UI.prototype.checkEmpty = function (name, lastName, email) {
    let result;
    if (name === '' || lastName === '' || email === '') {
        result = false;
    } else {
        result = true;
    }
    return result;
}

// show feedback div
UI.prototype.showFeedback = function (text, type) {
    const feedback = document.querySelector('.drink-form__feedback');
    if (type === 'success') {
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    } else if (type === 'error') {
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}
// remove alert 
UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink-form__feedback').classList.remove(type);
    }, 4000);
}

// create customer card
UI.prototype.addCustomerDiv = function (name, lastname) {
    // choose random image number
    let imageValue = Math.floor(5 * Math.random());

    // create the div HTML with the pre-set styles in CSS file
    let customerDiv = `<div class="person">
    <img src="img/person-${imageValue}.jpeg" alt="person" class="person__thumbnail">
    <h4 class="person__name">${name}</h4>
    <h4 class="person__last-name">${lastname}</h4>
  </div>`;
    return customerDiv;
}

// clear input fields
UI.prototype.clearFields = function () {
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}

// Constructor function for customer objects
function Customer(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}

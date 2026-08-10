// ============================================
// Updated JS file for the project that I worte originally in 2026 using ES6
// with the help of Gemini AI. This version is more modern, clean, and efficient.
// ============================================

// ==========================================
// 1. CUSTOMER CLASS
// ==========================================
/**
 * LEARNING POINT: ES6 CLASSES
 * Instead of your old ES5 constructor function (function Customer() {}), we use 
 * the modern 'class' syntax. It groups data blueprints together in a highly 
 * readable, clean way common to most modern programming languages.
 */
class Customer {
  constructor(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }
}

// ==========================================
// 2. UI CLASS (Manages DOM & State)
// ==========================================
class UI {
  /**
   * LEARNING POINT: DOM CACHING & PERFORMANCE
   * Instead of searching the webpage HTML over and over again inside every single method, 
   * the constructor runs ONCE when 'new UI()' is called. We find and store ("cache") 
   * the elements here. This makes your application run much faster.
   */
  constructor() {
    this.preloader = document.querySelector(".preloader");
    this.nav = document.querySelector('.nav');
    this.videoBtn = document.querySelector('.video__switch-btn');
    this.video = document.querySelector('.video__item');
    this.feedback = document.querySelector('.drink-form__feedback');
    this.cardList = document.querySelector('.drink-card__list');
    this.modal = document.querySelector('.work-modal');
    this.modalItem = document.querySelector('.work-modal__item');
    
    // Cached Form Inputs
    this.inputName = document.querySelector('.input-name');
    this.inputLastname = document.querySelector('.input-lastname');
    this.inputEmail = document.querySelector('.input-email');
  }

  // ==========================================
  // UI class methods
  // ==========================================
  
  /**
   * LEARNING POINT: CLASS METHODS
   * In modern JavaScript, you don't need the word 'function' or the bulky 
   * 'UI.prototype.hidePreloader = function() {}' syntax. You can type the 
   * name directly inside the class body.
   */
  hidePreloader() {
    if (this.preloader) this.preloader.style.display = "none";
  }

  /**
   * LEARNING POINT: OPTIONAL CHAINING (?.)
   * The '?' symbol ensures that if 'this.nav' isn't found on the page, the code 
   * stops quietly instead of crashing the site with a 'Cannot read properties of null' error.
   */
  toggleNav() {
    this.nav?.classList.toggle('nav--show');
  }

  hideNav() {
    this.nav?.classList.remove('nav--show');
  }

  /**
   * LEARNING POINT: TERNARY OPERATOR (? :) & GUARD CLAUSE
   * 1. 'if (!this.videoBtn ...) return;' is a Guard Clause. It stops the function early if elements are missing.
   * 2. 'isPaused ? trueAction : falseAction' is a clean shorthand replacing standard if/else statements.
   */
  videoControls() {
    if (!this.videoBtn || !this.video) return;

    const isPaused = this.videoBtn.classList.toggle('btnSlide');
    isPaused ? this.video.pause() : this.video.play();
  }

  /**
   * LEARNING POINT: DOUBLE BANG (!!) OPERATOR
   * Instead of a bulky 6-line if/else block returning true or false, the double bang (!!) 
   * forces the combined truthy/falsy text evaluations directly into a strict boolean true/false.
   */
  checkEmpty(name, lastName, email) {
    // The clean modern version:
    return !!(name.trim() && lastName.trim() && email.trim());
  }

  /**
   * LEARNING POINT: textContent VS innerText
   * 'textContent' is safer and faster than 'innerText' or 'innerHTML' because it 
   * treats the data strictly as plain text, preventing malicious HTML injection.
   */
  showFeedback(text, type) {
    if (!this.feedback) return;

    this.feedback.classList.add(type);
    this.feedback.textContent = text; 
    
    /**
     * LEARNING POINT: ARROW FUNCTION SCOPE CONTROL
     * Using '() =>' inside setTimeout ensures 'this' still correctly refers to 
     * our UI class instance, eliminating old ES5 scope binding bugs.
     */
    setTimeout(() => this.feedback.classList.remove(type), 4000);
  }

  /**
   * LEARNING POINT: OBJECT DESTRUCTURING & TEMPLATE LITERALS
   * 1. '{ name, lastname }' automatically extracts variables directly out of the customer object passed to it.
   * 2. Backticks (``) allow us to write clean, multi-line HTML string blocks directly in JavaScript.
   */
  addCustomerDiv({ name, lastname }) {
    const imageValue = Math.floor(Math.random() * 5);
    
    return `
      <div class="person">
        <img src="img/person-${imageValue}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${name}</h4>
        <h4 class="person__last-name">${lastname}</h4>
      </div>
    `;
  }

  clearFields() {
    this.inputName.value = '';
    this.inputLastname.value = '';
    this.inputEmail.value = '';
  }

  /**
   * LEARNING POINT: ELEMENT.CLOSEST() METHOD
   * 'event.target.closest()' looks upward through the HTML tree to find the nearest parent matching 
   * the selector. This is much safer than relying on unpredictable parentElement properties.
   */
  showModal(event) {
    event.preventDefault();
    const iconBtn = event.target.closest('.work-item__icon');

    if (iconBtn && this.modal && this.modalItem) {
      const id = iconBtn.dataset.id;
      this.modal.classList.add('work-modal--show');
      this.modalItem.style.backgroundImage = `url('img/work-${id}.jpeg')`;
    }
  }

  closeModal() {
    this.modal?.classList.remove('work-modal--show');
  }
}

// ==========================================
// 3. INITIALIZATION & EVENT LISTENERS
// ==========================================
function initApp() {
  const ui = new UI();

  // Hide preloader
  window.addEventListener('load', () => ui.hidePreloader());

  /**
   * LEARNING POINT: STOP PROPAGATION VS CANCEL BUBBLE
   * 'e.stopPropagation()' is the official, safe modern web standard. Your old 
   * 'e.cancelBubble = true' is formally deprecated and should no longer be used.
   */
  document.querySelector('.navBtn')?.addEventListener('click', (e) => {
    e.stopPropagation(); 
    ui.toggleNav();
  });

  document.body.addEventListener('click', () => ui.hideNav());

  document.querySelector('.nav')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Video Controls
  document.querySelector('.video__switch')?.addEventListener('click', () => {
    ui.videoControls();
  });

  // Drink Form Submission
  document.querySelector('.drink-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = ui.inputName.value;
    const lastName = ui.inputLastname.value;
    const email = ui.inputEmail.value;

    if (ui.checkEmpty(name, lastName, email)) {
      ui.showFeedback('Customer added to the list successfully', 'success');
      const customer = new Customer(name, lastName, email);
      
      /**
       * LEARNING POINT: INSERT ADJACENT HTML VS INNERHTML +=
       * Your old 'innerHTML +=' broke existing elements by destroying and parsing the whole list 
       * over again. 'insertAdjacentHTML' safely injects only the fresh markup into position 
       * without reloading any existing elements.
       */
      ui.cardList.insertAdjacentHTML('beforeend', ui.addCustomerDiv(customer));
      ui.clearFields();
    } else {
      ui.showFeedback('Some form values are empty', 'error');
    }
  });

  /**
   * LEARNING POINT: NODELIST FOREACH
   * Modern JavaScript allows you to run '.forEach()' directly on a 'querySelectorAll' loop. 
   * Older engines required converting lists to arrays first.
   */
  document.querySelectorAll('.work-item__icon').forEach((item) => {
    item.addEventListener('click', (e) => ui.showModal(e));
  });

  document.querySelector('.work-modal__close')?.addEventListener('click', () => {
    ui.closeModal();
  });
}

// Run the application
initApp();
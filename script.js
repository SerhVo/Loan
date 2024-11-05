/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.itemsSelector = items;
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }
  // hideItems:	Прячет все элементы, кроме последнего, в переданном контейнере и возвращает список этих элементов для дальнейшего использования.
  hideItems(container) {
    const items = container.querySelectorAll(this.itemsSelector);
    items.forEach((item, i) => {
      if (i !== items.length - 1) item.style.display = "none";
    });
    return items;
  }

  // bindTriggers:  Добавляет обработчик событий на кнопку “плюс” для показа скрытых элементов. Показ элементов происходит по одному, а кнопка “плюс” удаляется после отображения последнего элемента.

  bindTriggers(container, items, counter) {
    container.querySelector(".plus").addEventListener("click", () => {
      if (counter.value < items.length - 2) {
        items[counter.value].style.display = "flex";
        items[counter.value].classList.add("fadeIn");
        counter.value++;
      } else {
        items[counter.value].style.display = "flex";
        items[items.length - 1].remove();
      }
    });
  }

  // init:	Инициализирует компонент, проверяя существование элементов старого и нового офицеров. Прячет элементы и связывает обработчики событий с кнопками “плюс” для отображения скрытых элементов по клику.
  init() {
    try {
      if (this.oldOfficer && this.newOfficer) {
        this.oldItems = this.hideItems(this.oldOfficer);
        this.newItems = this.hideItems(this.newOfficer);
        this.bindTriggers(this.oldOfficer, this.oldItems, {
          value: this.oldCounter
        });
        this.bindTriggers(this.newOfficer, this.newItems, {
          value: this.newCounter
        });
      } else {
        ;
      }
    } catch (e) {
      console.warn('Elements not found for "oldOfficer" or "newOfficer"');
    }
  }
}

/***/ }),

/***/ "./src/js/modules/download.js":
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = "assets/img/main.jpg";
  }
  downloadItem(path) {
    const element = document.createElement("a");
    element.setAttribute("href", path);
    element.setAttribute("download", "nice_picture");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  init() {
    this.btns.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так..."
    };
    this.path = "assets/question.php";
  }
  clearInputs() {
    this.inputs.forEach(item => {
      item.value = "";
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach(input => {
      input.addEventListener("keypress", function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      });
      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data
    });
    return await res.text();
  }
  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(item => {
      item.addEventListener("submit", e => {
        e.preventDefault();
        let statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
        item.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(item);
        this.postData(this.path, formData).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(() => {
          statusMessage.textContent = this.message.failure;
        }).finally(() => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 6000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest(".module__video-item").nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute("data-disabled", "true");
        }
      } catch (e) {}
      btn.addEventListener("click", () => {
        if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true") {
          this.activeBtn = btn;
          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.path !== btn.getAttribute("data-url")) {
              this.path = btn.getAttribute("data-url");
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = btn.getAttribute("data-url");
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onStateChange: this.onPlayerStateChange
      }
    });
    this.overlay.style.display = "flex";
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);
      if (state.data === 0) {
        if (blockedElem.querySelector(".play__circle").classList.contains("closed")) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").appendChild(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem.querySelector(".play__text").classList.remove("attention");
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = "none";
          blockedElem.setAttribute("data-disabled", "false");
        }
      }
    } catch (e) {}
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/showInfo.js":
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInfo)
/* harmony export */ });
class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }
  init() {
    this.btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const sibling = btn.closest(".module__info-show").nextElementSibling;
        sibling.classList.toggle("msg");
        sibling.style.marginTop = "20px";
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    try {
      this.slides = [...this.container.children];
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = this.slides.length;
      }
      try {
        this.hanson.style.opacity = "0";
        if (n == 3) {
          this.hanson.classList.add("animated");
          setTimeout(() => {
            this.hanson.style.opacity = "1";
            this.hanson.classList.add("slideInUp");
          }, 3000);
        } else {
          this.hanson.classList.remove("slideInUp");
        }
      } catch (e) {}
      this.slides.forEach(slide => {
        slide.style.display = "none";
      });
      this.slides[this.slideIndex - 1].style.display = "block";
    } catch (e) {}
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.btns.forEach(item => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });
      item.parentNode.previousElementSibling.addEventListener("click", e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.prevmodule.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(-1);
      });
    });
    this.nextmodule.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector(".hanson");
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({
    container,
    next,
    prev,
    activeClass,
    animate = false,
    autoplay = false
  }) {
    super({
      container,
      next,
      prev,
      activeClass,
      animate,
      autoplay
    });
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
  }
  decorizeSlides() {
    // Убираем активный класс и сбрасываем стиль для всех слайдов
    [...this.container.children].forEach(slide => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        this.setStyle(slide, 0.4, 0);
      }
    });

    // Применяем активный класс для первого слайда (если он не кнопка)
    if (!this.slides[0].closest("button")) {
      this.slides[0].classList.add(this.activeClass);
    }

    // Применяем анимацию, если она включена
    if (this.animate) {
      this.setStyle(this.slides[0], 1, 1);
    }
  }
  setStyle(slide, titleOpacity, arrowOpacity) {
    const title = slide.querySelector(".card__title");
    const arrow = slide.querySelector(".card__controls-arrow");
    if (title) title.style.opacity = titleOpacity;
    if (arrow) arrow.style.opacity = arrowOpacity;
  }
  nextSlide() {
    const [firstSlide, secondSlide, thirdSlide] = this.slides;

    // Перемещаем слайды и кнопки, если есть
    if (secondSlide.tagName === "BUTTON" && thirdSlide.tagName === "BUTTON") {
      this.moveSlides([firstSlide, secondSlide, thirdSlide]);
    } else if (secondSlide.tagName === "BUTTON") {
      this.moveSlides([firstSlide, secondSlide]);
    } else {
      this.moveSlides([firstSlide]);
    }
  }
  moveSlides(slides) {
    slides.forEach(slide => this.container.appendChild(slide));
    this.decorizeSlides();
  }
  bindTriggers() {
    if (this.next) {
      this.next.addEventListener("click", () => this.nextSlide());
    }
    if (this.prev) {
      this.prev.addEventListener("click", () => {
        // Перемещаем последний слайд (если он не кнопка) в начало
        for (let i = this.slides.length - 1; i > 0; i--) {
          if (this.slides[i].tagName !== "BUTTON") {
            this.container.insertBefore(this.slides[i], this.slides[0]);
            this.decorizeSlides();
            break;
          }
        }
      });
    }
  }
  init() {
    try {
      if (!this.container) {
        return;
      }

      // Устанавливаем CSS-стили для контейнера
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;
      this.bindTriggers();
      this.decorizeSlides();

      // Включаем автопрокрутку, если она активирована
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    } catch (e) {
      console.error("Container not found for MiniSlider.");
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.prevmodule = document.querySelectorAll(".prevmodule");
    this.nextmodule = document.querySelectorAll(".nextmodule");
    this.slideIndex = 1;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");







window.addEventListener("DOMContentLoaded", () => {
  // Main Slider
  try {
    const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
      btns: ".next",
      container: ".page"
    });
    slider.render();
  } catch (e) {
    // console.error("Main slider container not found");
  }
  try {
    const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
      btns: ".next",
      container: ".moduleapp"
    });
    modulePageSlider.render();
  } catch (e) {}

  //ShowUp Mini Slider
  try {
    const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
      container: ".showup__content-slider",
      prev: ".showup__prev",
      next: ".showup__next",
      activeClass: "card-active",
      animate: true
    });
    showUpSlider.init();
  } catch (e) {
    // console.error("ShowUp mini slider container not found");
  }

  // Modules Mini Slider

  try {
    const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
      container: ".modules__content-slider",
      prev: ".modules__info-btns .slick-prev",
      next: ".modules__info-btns .slick-next",
      activeClass: "card-active",
      animate: true,
      autoplay: true
    });
    modulesSlider.init();
  } catch (e) {
    console.error("Modules mini slider container not found");
  }

  // Feed Mini Slider
  try {
    const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
      container: ".feed__slider",
      prev: ".feed__slider .slick-prev",
      next: ".feed__slider .slick-next",
      activeClass: "feed__item-active"
    });
    feedSlider.init();
  } catch (e) {}

  // Video Player
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"](".showup .play", ".overlay").init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"](".module__video-item .play", ".overlay").init();

  // Difference
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"](".officerold", ".officernew", ".officer__card-item").init();
  new _modules_form__WEBPACK_IMPORTED_MODULE_4__["default"](".form").init();
  new _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__["default"](".plus__content").init();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"](".download").init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map
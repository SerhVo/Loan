/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    console.log(this.player);
    this.overlay.style.display = 'flex';
  }
  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseBtn();
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
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  render() {
    try {
      this.hanson = document.querySelector(".hanson");
    } catch (e) {}
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
    this.showSlides(this.slideIndex);
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


// export default class MiniSlider extends Slider {
//   constructor(container, next, prev, activeClass, animate, autoplay) {
//     super(container, next, prev, activeClass, animate, autoplay);
//   }

//   decorizeSlides() {
//     [...this.container.children].forEach((slide) => {
//       slide.classList.remove(this.activeClass);
//       if (this.animate) {
//         slide.querySelector(".card__title").style.opacity = "0.4";
//         slide.querySelector(".card__controls-arrow").style.opacity = "0";
//       }
//     });

//     if (!this.slides[0].closest("button")) {
//       this.slides[0].classList.add(this.activeClass);
//     }

//     if (this.animate) {
//       this.slides[0].querySelector(".card__title").style.opacity = "1";
//       this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
//     }
//   }

//   nextSlide() {
//     if (
//       this.slides[1].tagName == "BUTTON" &&
//       this.slides[2].tagName == "BUTTON"
//     ) {
//       this.container.appendChild(this.slides[0]); // Slide
//       this.container.appendChild(this.slides[1]); // Btn
//       this.container.appendChild(this.slides[2]); // Btn
//       this.decorizeSlides();
//     } else if (this.slides[1].tagName == "BUTTON") {
//       this.container.appendChild(this.slides[0]); // Slide
//       this.container.appendChild(this.slides[1]); // Btn
//       this.decorizeSlides();
//     } else {
//       this.container.appendChild(this.slides[0]);
//       this.decorizeSlides();
//     }
//   }

//   bindTriggers() {
//     this.next.addEventListener("click", () => {
//       this.nextSlide();
//     });

//     this.prev.addEventListener("click", () => {
//       for (let i = this.slides.length - 1; i > 0; i--) {
//         if (this.slides[i].tagName !== "BUTTON") {
//           let active = this.slides[i];
//           this.container.insertBefore(active, this.slides[0]);
//           this.decorizeSlides();
//           break;
//         }
//       }
//     });
//   }

//   init() {
//     this.container.style.cssText = `
//             display: flex;
//             flex-wrap: wrap;
//             overflow: hidden;
//             align-items: flex-start;
//         `;

//     this.bindTriggers();
//     this.decorizeSlides();

//     if (this.autoplay) {
//       setInterval(() => this.nextSlide(), 5000);
//     }
//   }
// }

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
    if (!this.container) {
      console.error("Container not found for MiniSlider.");
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
    this.slides = this.container.children;
    this.btns = document.querySelectorAll(btns);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
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



window.addEventListener("DOMContentLoaded", () => {
  // Main Slider
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: ".next",
    container: ".page"
  });
  if (slider.container) {
    slider.render();
  } else {
    console.error("Main slider container not found");
  }

  //ShowUp Mini Slider
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".showup__content-slider",
    prev: ".showup__prev",
    next: ".showup__next",
    activeClass: "card-active",
    animate: true
  });
  if (showUpSlider.container) {
    showUpSlider.init();
  } else {
    console.error("ShowUp mini slider container not found");
  }

  // Modules Mini Slider
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".modules__content-slider",
    prev: ".modules__info-btns .slick-prev",
    next: ".modules__info-btns .slick-next",
    activeClass: "card-active",
    animate: true,
    autoplay: true
  });
  if (modulesSlider.container) {
    modulesSlider.init();
  } else {
    console.error("Modules mini slider container not found");
  }

  // Feed Mini Slider
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: ".feed__slider",
    prev: ".feed__slider .slick-prev",
    next: ".feed__slider .slick-next",
    activeClass: "feed__item-active"
  });
  if (feedSlider.container) {
    feedSlider.init();
  } else {
    console.error("Feed mini slider container not found");
  }

  // Video Player
  const player = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"](".showup .play", ".overlay");
  if (player.overlay) {
    player.init();
  } else {
    console.error("Video player overlay not found");
  }
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map
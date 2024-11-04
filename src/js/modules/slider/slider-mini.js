import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor({
    container,
    next,
    prev,
    activeClass,
    animate = false,
    autoplay = false,
  }) {
    super({ container, next, prev, activeClass, animate, autoplay });
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
  }

  decorizeSlides() {
    // Убираем активный класс и сбрасываем стиль для всех слайдов
    [...this.container.children].forEach((slide) => {
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
    slides.forEach((slide) => this.container.appendChild(slide));
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

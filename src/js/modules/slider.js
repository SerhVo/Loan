export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);

    if (this.page) {
      this.slides = Array.from(this.page.children); // Преобразуем в массив
    } else {
      console.error(`Элемент ${page} не найден`);
      return;
    }

    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }

  showSlides(n) {
    if (!this.slides) return; // Защита от попытки доступа, если slides не определен

    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    this.slides.forEach((slide) => {
      slide.style.display = "none";
    });

    this.slides[this.slideIndex - 1].style.display = "block";
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  render() {
    if (!this.page || !this.btns.length) return;

    this.btns.forEach((item) => {
      item.addEventListener("click", () => {
        this.plusSlides(1);
      });

      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}

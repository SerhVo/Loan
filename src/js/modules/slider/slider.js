export default class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
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

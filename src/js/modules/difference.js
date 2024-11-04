export default class Difference {
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
          value: this.oldCounter,
        });
        this.bindTriggers(this.newOfficer, this.newItems, {
          value: this.newCounter,
        });
      } else {
        ;
      }
    } catch (e) {console.warn('Elements not found for "oldOfficer" or "newOfficer"')}
  }
}

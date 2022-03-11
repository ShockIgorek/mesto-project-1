//* Родительский класс всех попапов
export class Popup {
    constructor(popupElement) {
      this._popupElement = popupElement;
    //   this._popupOverlay = this._popupElement.querySelector(".popup__overlay");
      this._popupCloseButton = this._popupElement.querySelector(
        ".popup__exit"
      );
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    //* Расчет ширины вертикального скролла
    //* При открытии попапа блокируется прокрутка страницы и чтобы контент не дергался, странице добавляется граница справа шириной с полосу прокрутки
    _calcScrollWidth() {
      const auxiliaryBlock = document.createElement("div");
      auxiliaryBlock.style.width = "50px";
      auxiliaryBlock.style.height = "50px";
      auxiliaryBlock.style.overflowY = "scroll";
      auxiliaryBlock.style.visibility = "hidden";
  
      document.body.appendChild(auxiliaryBlock);
      const scrollWidth = auxiliaryBlock.offsetWidth - auxiliaryBlock.clientWidth;
      auxiliaryBlock.remove();
  
      return scrollWidth;
    }
  
    //* Метод открытия попапа и блокировки скролла страницы
    open() {
      const scrollWidth = this._calcScrollWidth();
      document.addEventListener("keyup", this._handleEscClose);
      this._popupElement.classList.add("popup_opened");
      document.body.style.overflow = "hidden";
  
      //* Добавление границы с шириной равной ширине скролла
      document.body.style.borderRight = `${scrollWidth}px solid black`;
    }
  
    //* Метод закрытия попапа
    close() {
      document.removeEventListener("keyup", this._handleEscClose);
      this._popupElement.classList.remove("popup_opened");
      document.body.style.overflow = "";
      document.body.style.borderRight = "none";
    }
  
    //* Метод закрытия на ESC
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    //* Установка слушателей
    setEventListeners() {
      this._popupCloseButton.addEventListener("click", () => {
        this.close();
      });
    //   this._popupOverlay.addEventListener("click", () => {
    //     if (this._popupElement.classList.contains("popup_opened")) {
    //       this.close();
    //     }
    //   }
    //   );
    }
  }
  
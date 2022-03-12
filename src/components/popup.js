export class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupCloseButton = this._popupElement.querySelector(
      ".popup__exit"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
  open() {
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupElement.classList.remove("popup_opened");
  }
}
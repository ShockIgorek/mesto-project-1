export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(event) {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    _clickClosePopupForm(event) {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('keyup', this._handleEscClose.bind(this));
        this._popupSelector.addEventListener('mousedown', this._clickClosePopupForm.bind(this));
    }
}



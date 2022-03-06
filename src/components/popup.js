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
            console.log('esc')
            this.close();
        }
    }

    _clickClosePopupForm(event) {
        if (event.target.classList.contains('popup')) {
            console.log('mousedown')
            this.close();
        }
    }

    setEventListeners() {
//разобраться с esc
        this._popupSelector.addEventListener('keyup', this._handleEscClose.bind(this));
        this._popupSelector.addEventListener('mousedown', this._clickClosePopupForm.bind(this));
        this._popupSelector.querySelector('.popup__exit').addEventListener('click', () => {this.close();console.log('click')})
    }
}



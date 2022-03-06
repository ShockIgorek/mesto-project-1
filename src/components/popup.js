export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._removeEventListeners()
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
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
    _removeEventListeners () {
        this._popupSelector.removeEventListener('keyup', this._handleEscClose.bind(this));
        this._popupSelector.removeEventListener('mousedown', this._clickClosePopupForm.bind(this));
        this._popupSelector.querySelector('.popup__exit').removeEventListener('click', () => {this.close();console.log('click')})
    }
    setEventListeners() {
        this._popupSelector.addEventListener('keyup', this._handleEscClose.bind(this));
        this._popupSelector.addEventListener('mousedown', this._clickClosePopupForm.bind(this));
        this._popupSelector.querySelector('.popup__exit').addEventListener('click', () => {this.close();console.log('click')})
    }
    
}



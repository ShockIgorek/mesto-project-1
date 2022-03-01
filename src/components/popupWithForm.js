import {
    Popup
} from './popup';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._callback = callback;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._submitBtn = this._popupSelector.querySelector('.popup__save-btn');
        this._formInputs = this._popupSelector.querySelectorAll('.popup__edit');
        // this._formInputText = this._submitBtn.textContent; 
    }
    _getInputValues() {
        let inputValue
        this._formInputs.forEach((input) => {
            inputValue = input.value
            console.log(inputValue)
            return inputValue
        })
        console.log(inputValue)
        return inputValue
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this.setEventListeners();
    }   

    setEventListeners() {
        this._popupForm.addEventListener(('submit', (evt) => {
            evt.preventDefault();
            this._callback
        }))
    }


}
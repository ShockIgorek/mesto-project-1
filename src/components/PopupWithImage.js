import { Popup } from './Popup';

export class PopupWithImage extends Popup {
    constructor(popupSelector, imgSelector) {
        super(popupSelector); 
        this._imgSelector = document.querySelector(imgSelector);
        this._popupName =  this._popupSelector.querySelector('.popup__name');
    }

    open(data) {
        console.log(data)
        super.open();
        this._imgSelector.setAttribute('src', data.image);
        this._imgSelector.setAttribute('alt', data.text);
        this._popupName.textContent = data.text;
    }
}


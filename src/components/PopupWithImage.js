import { Popup } from './Popup';

export class PopupWithImage extends Popup {
    constructor(popupSelector, imgSelector) {
        super(popupSelector); 
        this._imgSelector = imgSelector;
    }

    open(name, imgLink, imgName) {
        super.open();
        document.querySelector(this._imgSelector).setAttribute('src', imgLink);
        document.querySelector(this._imgSelector).setAttribute('alt', imgName);
        name.textContent = imgName;
    }
}


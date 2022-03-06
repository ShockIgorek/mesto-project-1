import {
    Popup
} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSection, popupSelector, callbackSubmitForm ) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupSection = popupSection;
    }

    _getInputValues() {
        return this._popupSection.querySelectorAll('.popup__edit')
    }
    

    close() {
        super.close();
        
        this._getInputValues().forEach(element => {
            element.value = '';
        });
    }
    open() {
        super.open();
    }
}
import {
    Popup
} from './Popup';

export class PopupWithForm extends Popup {
    constructor(popupSection, popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupSection = popupSection;
        this._submit = this._submit.bind(this);
    }

    _getInputValues() {
        return Array.from(this._popupSection.querySelectorAll('.popup__edit')).map(item => {
            return item.value;
        })
    }

    setEventListeners(evt) {
        super.setEventListeners();
        this._popupSection.addEventListener('submit', (evt) => {
            this._callbackSubmitForm(evt, this._getInputValues())
        });
    }

    close() {
        super.close();
        Array.from(document.querySelectorAll('.popup__form')).forEach(form => {
            form.reset();
        })
    }



    _submit(evt) {
        evt.preventDefault();
        this._callbackSubmitForm(this.data);
    }


}
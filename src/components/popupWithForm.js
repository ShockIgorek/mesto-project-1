import { Popup} from './popup-oop';

export class PopupWithForm extends Popup {
    constructor({
        popupSelector,
        FormSubmit
    }) {
        super(popupSelector);
        this._handleFormSubmit = FormSubmit;
        
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__edit');
        this._submitBtn = this._popupForm.querySelector('.popup__save-btn');
        this._submitBtnText = this._submitBtn.textContent;
    }


}
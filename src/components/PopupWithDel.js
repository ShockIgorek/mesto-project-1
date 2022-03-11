import {
    Popup
} from "./Popup.js";

export class PopupWithDel extends Popup {
    constructor(popupSelector,  {callbackSubmitForm}) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector(".popup__form");
        this._callbackSubmitForm = callbackSubmitForm;
        this._submit = this._submit.bind(this);
    }

    _submit(evt) {
        evt.preventDefault();
        this._callbackSubmitForm(this.data);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._submit);
    }
}
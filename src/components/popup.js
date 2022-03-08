class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        this._popupSelector.removeEventListener('click', this._clickCloseBtn.bind(this));
    }

    _clickCloseBtn() {
        this.close();
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__exit').addEventListener('click', () => {this._clickCloseBtn()});
    }
}

const popupAvatar = new Popup(document.querySelector('#popup-avatar'));
const popupProfileEdit = new Popup(document.querySelector('#popup-edit'));
const popupCardAdd = new Popup(document.querySelector('#popup-add'));
const popupImg = new Popup(document.querySelector('#popup-img'));
const popupDeleteCard = new Popup(document.querySelector('#popup-delete-card')); 

export {
    Popup,
    popupAvatar,
    popupProfileEdit,
    popupCardAdd,
    popupImg,
    popupDeleteCard
} 
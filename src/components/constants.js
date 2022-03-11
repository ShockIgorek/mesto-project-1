
// const profileEditPopup = document.querySelector('#popup-edit');
// const sectionPopupAdd = document.querySelector('#popup-add');
// const profileAdd = document.querySelector('.profile__add');
// const profileAvatar = document.querySelector('.profile__avatar-edit');
// const popupDelForm = document.querySelector('#delete-form');
// const agreeDeleteCard = popupDelCard.querySelector('#delete-button');
// const popupFormAvatar = SectionPopupAvatar.querySelector('.popup__form');
// const popupFormEdit = document.querySelector('#popup__form-id');
// const userNameField = document.querySelector('#user-name-field');
// const userCareerField = document.querySelector('#user-career-field');
// const popupBtnCreate = document.querySelector('#create-button');
// const popupBtnSave = document.querySelector('#save-button');
// const popupAvatarBtnSave = SectionPopupAvatar.querySelector('#save-avatar-btn');
// const popupFormAdd = document.querySelector('#popup-form-add');
// const cardTemplate = document.querySelector('#card');
// const popupNameItem = document.querySelector('.popup__name');




export const validationConfig = {
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__error_visible',
    errorClass: 'popup__edit_visible',
}
//информация профиля
export const profileName = document.querySelector('.profile__name');//profileName
export const profileJob = document.querySelector('.profile__career');//profileCareer
export const profileAvatar = document.querySelector('.profile__avatar');//profileAvatarImg
//кнопки
export const profileEditButton = document.querySelector('.profile__edit');//profileEditBtn
export const profileAvatarEditButton = document.querySelector('.profile__avatar-edit');//можно удалить



//popups
export const avatarEditPopup = document.querySelector('#popup-avatar');//SectionPopupAvatar

export const cardDeletePopup = document.querySelector('#popup-delete-card');

export const editProfilePopup = document.querySelector('#popup-edit');//profileEditPopup
export const editProfileNameInput = editProfilePopup.querySelector('#user-name-field');//popupUserName
export const editProfileJobInput = editProfilePopup.querySelector('#user-career-field');//popupUserCareer

export const profileAddButton = document.querySelector('.profile__add');
export const addCardPopup = document.querySelector("#popup-add");

export const openPicturePopup = document.querySelector("#popup-img");
export const cardTemplate = document.querySelector("#card");
export const cardsContainer = document.querySelector('.cards');

import '../index.css';
import {
  api
} from './Api.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  UserInfo
} from './UserInfo.js';
import {
  Card,
  itemCard,
  itemCardId
} from './Сard.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './PopupWithForm.js';
import {
  Section
} from './Section.js';
const config = {
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__error_visible',
  errorClass: 'popup__edit_visible',
}
const cardsContainer = document.querySelector('.cards');
const profileEditPopup = document.querySelector('#popup-edit');
const sectionPopupAdd = document.querySelector('#popup-add');
const popupContainer = profileEditPopup.querySelector('.popup__container');
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const profileAvatar = document.querySelector('.profile__avatar-edit');
const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');
const profileAvatarImg = document.querySelector('.profile__avatar');
const popupExit = popupContainer.querySelector('.popup__exit');
const SectionPopupAvatar = document.querySelector('#popup-avatar');
const closeAvatar = SectionPopupAvatar.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const popupDelCard = document.querySelector('#popup-delete-card');
const agreeDeleteCard = popupDelCard.querySelector('#delete-button');
const closeDelCard = popupDelCard.querySelector('.popup__exit');
const popupFormAvatar = SectionPopupAvatar.querySelector('.popup__form');
const popupFormEdit = document.querySelector('#popup__form-id');
const popupExitImg = document.querySelector('.popup__exit-img');
const popupUserName = profileEditPopup.querySelector('#user-name-field');
const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
const userNameField = document.querySelector('#user-name-field');
const userCareerField = document.querySelector('#user-career-field');
const imgNameField = document.querySelector('#img-name-field');
const imgLinkField = document.querySelector('#img-link-field');
const imgAvatarField = SectionPopupAvatar.querySelector('.popup__edit');
const popupBtnCreate = document.querySelector('#create-button');
const popupBtnSave = document.querySelector('#save-button');
const popupAvatarBtnSave = SectionPopupAvatar.querySelector('#save-avatar-btn');
const popupFormAdd = document.querySelector('#popup-form-add');
const popupContainerImg = document.querySelector('.popup__container-img');
const popupName = popupContainerImg.querySelector('.popup__name');
const cardTemplate = document.querySelector('#card');
const popupWithImage = new PopupWithImage(document.querySelector('#popup-img'), document.querySelector('.popup__img'));
const popupAvatarForm = new PopupWithForm(popupFormAvatar, SectionPopupAvatar, handleAvatarSubmit);
const popupEditForm = new PopupWithForm(popupFormEdit, profileEditPopup, handleUserInfoFormSubmit);
const popupAddForm = new PopupWithForm(popupFormAdd, sectionPopupAdd, handleCardInfoFormSubmit);
const popupDelOneCard = new PopupWithForm(popupDelCard, popupDelCard);
const section = new Section(renderCard, cardsContainer);
const formValidatorAvatar = new FormValidator(popupFormAvatar, config)
const formValidatorEdit = new FormValidator(popupFormEdit, config)
const formValidatorAdd = new FormValidator(popupFormAdd, config)
const userInfo = new UserInfo({ 
  userName: profileName,
  userAbout: profileCareer
})


formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
let meId;
let idCard;

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.getUserInfo();
    changeAvatar(profileAvatarImg, user.avatar);
    meId = user._id;

    const createdCards = createCards(cards);
    section.renderItems(createdCards);
    idCard = cards._id;
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))



function createCards(arrCard) {
  return arrCard.map(element => {
    const data = {
      name: element.name,
      link: element.link,
      likesCount: element.likes.length,
      ownerId: element.owner._id,
      likes: element.likes,
      cardId: element._id
    }
    return new Card(data, cardTemplate, popupWithImage, popupDelOneCard, api, meId);
  });
}

function renderCard(card) {
  card.renderCard();
}

function changeElementTextContent(elementDOM, objValue) {
  const element = elementDOM;
  element.textContent = objValue;
}

function changeAvatar(elementDOM, objValue) {
  const element = elementDOM;
  element.src = objValue;
}

function fillEditForm() {
  popupUserName.setAttribute('value', profileName.textContent);
  popupUserCareer.setAttribute('value', profileCareer.textContent);
}

function handleEscClose(event) {
  if (event.code === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      if (popup !== null) {
        popup.classList.remove('popup_opened');
      }
  } 
}

function clickClosePopupForm(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    popup.classList.remove('popup_opened');
  }
}

function deleteCard(card) {
  api.deleteUserCard(itemCardId)
    .then(() => {
      popupDelOneCard.close();
      card.remove();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  //const avatarLink = imgAvatarField.value;
  api.updateAvatarUser(/*avatarLink*/popupAvatarForm.getInputValues())
    .then(() => {
      changeAvatar(profileAvatarImg, /*avatarLink*/popupAvatarForm.getInputValues());
      popupAvatarForm.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupAvatarBtnSave.textContent = 'Сохранить';
    })
  popupAvatarBtnSave.textContent = 'Сохранение...';
}

function handleUserInfoFormSubmit(evt) {
  evt.preventDefault();
  popupBtnSave.textContent = 'Сохранение...';
  userInfo.setUserInfo(/*userNameField.value, userCareerField.value*/popupEditForm.getInputValues()[0], popupEditForm.getInputValues()[1]);
  const nameValue = /*userNameField.value*/popupEditForm.getInputValues()[0];
  const careerValue = /*userCareerField.value*/popupEditForm.getInputValues()[1];
  popupBtnSave.textContent = 'Сохранить';
  popupEditForm.close();
  userNameField.value = nameValue;
  userCareerField.value = careerValue;
}

function handleCardInfoFormSubmit(evt) {
  evt.preventDefault();

  api.addNewCard(/*imgNameField.value, imgLinkField.value*/popupAddForm.getInputValues()[0], popupAddForm.getInputValues()[1])
    .then((card) => {
      const data = {
        name: card.name,
        link: card.link,
        likesCount: card.likes.length,
        ownerId: card.owner._id,
        likes: card.likes,
        cardId: card._id
      }

      const newCard = new Card(data, cardTemplate, popupWithImage, popupDelOneCard, api, meId);
      //newCard.renderCard()
      section.addItem(newCard.createCard());
      formValidatorAdd.disableButton(popupBtnCreate);
      popupAddForm.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupBtnCreate.textContent = 'Создать';
    });
  popupBtnCreate.textContent = 'Создание...';
}

document.addEventListener('keyup', (event) => {handleEscClose(event)});
document.addEventListener('mousedown', (event) => {clickClosePopupForm(event)});

profileAvatar.addEventListener('click', function () {
  popupAvatarForm.open();
});
profileEdit.addEventListener('click', function () {
  popupEditForm.open();
});
profileEdit.addEventListener('click', fillEditForm);
profileAdd.addEventListener('click', function () {
  popupAddForm.open();
});

agreeDeleteCard.addEventListener('click', () => {
  deleteCard(itemCard)
});
popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupDelOneCard.setEventListeners();

export {
  meId,
  idCard,
  popupBtnCreate,
  popupBtnSave,
  popupAvatarBtnSave,
  changeElementTextContent,
  changeAvatar,
  popupWithImage
}
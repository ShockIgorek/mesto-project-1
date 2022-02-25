import '../index.css';
import { api } from './api-oop';
import { formValidator } from './validate';
import { popupAvatar, popupProfileEdit, popupCardAdd, popupImg, popupDeleteCard } from './popup';
import { createCard, renderCard, containerCards } from './card';

const cardsContainer = document.querySelector('.cards');
const profileEditPopup = document.querySelector('#popup-edit');
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
const closeDelCard = popupDelCard.querySelector('.popup__exit');
const popupFormAvatar = SectionPopupAvatar.querySelector('.popup__form');
const popupFormEdit = document.querySelector('#popup__form-id');
const popupExitImg = document.querySelector('.popup__exit-img');
const popupUserName = profileEditPopup.querySelector('#user-name-field');
const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
const userNameField = document.querySelector('#user-name-field');
const userCareerField = document.querySelector('#user-career-field');
const profileNameContent = document.querySelector('.profile__name');
const profileCareerContent = document.querySelector('.profile__career');
const imgNameField = document.querySelector('#img-name-field');
const imgLinkField = document.querySelector('#img-link-field');
const imgAvatarField = SectionPopupAvatar.querySelector('.popup__edit');
const popupBtnCreate = document.querySelector('#create-button');
const popupBtnSave = document.querySelector('#save-button');
const popupAvatarBtnSave = SectionPopupAvatar.querySelector('#save-avatar-btn');
const popupFormAdd = document.querySelector('#popup-form-add');
let meId;
let idCard;

api.getAppInfo()
  .then(([user, cards]) => {
    changeElementTextContent(profileName, user.name); 
    changeElementTextContent(profileCareer, user.about);
    changeAvatar(profileAvatarImg, user.avatar);
    meId = user._id; 

    renderAllCards(cards);
    idCard = cards._id;
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  
  formValidator.enableValidation();

function renderAllCards(arrCard) {
  arrCard.reverse().forEach(element => {
    const newCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element.likes, element._id);
    renderCard(newCard, cardsContainer);
  });
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

function handleAvatarSubmit (evt) {
  evt.preventDefault();
  
  const avatarLink = imgAvatarField.value;

  api.updateAvatarUser(avatarLink)
    .then(() => {
      changeAvatar(profileAvatarImg, avatarLink);
      popupAvatar.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {popupAvatarBtnSave.textContent = 'Сохранить';}) 
    popupAvatarBtnSave.textContent = 'Сохранение...';
}

function handleUserInfoFormSubmit (evt) {
  evt.preventDefault();

  api.sendInfo(userNameField.value, userCareerField.value)
    .then((userInfo) => {
      profileNameContent.textContent = userInfo.name;
      profileCareerContent.textContent = userInfo.about;
      popupProfileEdit.close();
      //closePopup(profileEditPopup);
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {popupBtnSave.textContent = 'Сохранить';});
    popupBtnSave.textContent = 'Сохранение...';
}

function handleCardInfoFormSubmit (evt) {
  evt.preventDefault();

  api.addNewCard(imgNameField.value, imgLinkField.value)
    .then((card) => {
      const newCard = createCard(card.name, card.link, card.likes.length, card.owner._id, card.likes, card._id);
      renderCard(newCard, containerCards);

      formValidator.disableButton(popupBtnCreate);
      popupCardAdd.close();
      popupFormAdd.reset(); 
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {popupBtnCreate.textContent = 'Создать';});
    popupBtnCreate.textContent = 'Создание...';  
}

profileAvatar.addEventListener('click', function() {popupAvatar.open()});
profileEdit.addEventListener('click', function() {popupProfileEdit.open()});
profileEdit.addEventListener('click', fillEditForm);
profileAdd.addEventListener('click', function() {popupCardAdd.open()});

closeAvatar.addEventListener('click', function() {popupAvatar.close()});
popupExit.addEventListener('click', function() {popupProfileEdit.close()});
exitBtn.addEventListener('click', function() {popupCardAdd.close()});
popupExitImg.addEventListener('click', function() {popupImg.close()});
closeDelCard.addEventListener('click', function() {popupDeleteCard.close()});

popupFormAvatar.addEventListener('submit', handleAvatarSubmit);
popupFormEdit.addEventListener('submit', handleUserInfoFormSubmit);
popupFormAdd.addEventListener('submit', handleCardInfoFormSubmit);

export { meId, idCard, popupBtnCreate, popupBtnSave, popupAvatarBtnSave, changeElementTextContent, changeAvatar }
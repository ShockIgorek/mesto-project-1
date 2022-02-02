import '../index.css';
import { meId, idCard, sendInfo, getCards, addNewCard, getAppInfo, updateAvatarUser } from './api';
import { validationConfig, enableValidation, disableButton } from './validate';
import { popupImg, createCard, renderCard, containerCards } from './card';
import { profileEditPopup, popupAdd, popupFormAdd, popupAvatar, popupDeleteCard, openPopup, closePopup } from './modal';

const cardsContainer = document.querySelector('.cards');
const popupContainer = profileEditPopup.querySelector('.popup__container'); 
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const profileAvatar = document.querySelector('.profile__avatar-edit');
const popupExit = popupContainer.querySelector('.popup__exit');
const closeAvatar = popupAvatar.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const closeDelCard = popupDeleteCard.querySelector('.popup__exit');
const popupFormAvatar = popupAvatar.querySelector('.popup__form');
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
const popupBtnCreate = document.querySelector('#create-button');
const popupBtnSave = document.querySelector('#save-button');
const popupAvatarBtnSave = popupAvatar.querySelector('#save-avatar-btn');

getAppInfo()
  .then(([user, cards]) => {
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))

enableValidation(validationConfig);

function initialAllCards(arrCard) {
  arrCard.reverse().forEach(element => {
    const newCard = createCard(element.name, element.link, element.likes.length, element.owner._id, element.likes, element._id);
    renderCard(newCard, cardsContainer);
    //const temp = document.querySelector('#temp');
    //temp.id = element._id;
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
  const profileName = document.querySelector('.profile__name').textContent;
  const profileCareer = document.querySelector('.profile__career').textContent;
  popupUserName.setAttribute('value', profileName);
  popupUserCareer.setAttribute('value', profileCareer);
}

function changeAvatarSubmitHandler (evt) {
  evt.preventDefault();
  
  const imgAvatarField = popupAvatar.querySelector('.popup__edit');
  const avatarLink = imgAvatarField.value;

  changeAvatar(document.querySelector('.profile__avatar'), avatarLink);
  closePopup(popupAvatar);
  updateAvatarUser(avatarLink);
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileNameContent.textContent = userNameField.value;
  profileCareerContent.textContent = userCareerField.value;
  sendInfo(userNameField.value, userCareerField.value);
  closePopup(profileEditPopup);
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();

  addNewCard(imgNameField.value, imgLinkField.value)
    .then((cardData) => {
      return cardData.json();
      //const newCard = createCard(imgNameField.value, imgLinkField.value, 0, meId, [], cardData._id);
      const newCard = createCard(cardData.name, cardData.link, 0, meId, [], cardData._id);
      console.log(`Имя - ${cardData.name}, Ссылка - ${cardData.link}, лайки - ${cardData.likes}`);
      renderCard(newCard, containerCards);
    })
    .then((card) => {
      const newCard = createCard(card.name, card.link, card.likes.length, card.owner._id, card.likes, card._id);
      renderCard(newCard, containerCards);
    })
    
  disableButton (popupBtnCreate, validationConfig.inactiveButtonClass);
  closePopup(popupAdd);
  popupFormAdd.reset(); 
}

profileAvatar.addEventListener('click', function() {openPopup(popupAvatar)});
profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)});
profileEdit.addEventListener('click', fillEditForm);
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});

closeAvatar.addEventListener('click', function() {closePopup(popupAvatar)});
popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});
popupExitImg.addEventListener('click', function() {closePopup(popupImg)});
closeDelCard.addEventListener('click', function() {closePopup(popupDeleteCard)});

popupFormAvatar.addEventListener('submit', changeAvatarSubmitHandler);
popupFormEdit.addEventListener('submit', editFormSubmitHandler);
popupFormAdd.addEventListener('submit', addFormSubmitHandler);

export { popupBtnCreate, popupBtnSave, popupAvatarBtnSave, initialAllCards, changeElementTextContent, changeAvatar }
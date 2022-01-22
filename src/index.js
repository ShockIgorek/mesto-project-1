import './index.css';
import { validationConfig, enableValidation } from './components/validate';
import { initialCards, popupImg, createCard, renderCard } from './components/card';
import { profileEditPopup, popupAdd, popupFormAdd, openPopup, closePopup, closeByKeyPopup, clickClosePopupForm, editFormSubmitHandler, fillEditForm, addFormSubmitHandler } from './components/modal';

enableValidation(validationConfig);

initialCards.reverse().forEach(element => {
  const newCard = createCard(element.name, element.link);
  const container = document.querySelector('.cards');
  renderCard(newCard, container);
}); 

const popupContainer = profileEditPopup.querySelector('.popup__container'); 
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupExit = popupContainer.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const popupForm = document.querySelector('.popup__form');
const nameCard = document.querySelectorAll('.card__text');
const linkCard = document.querySelectorAll('.card__image');
const arrNameCard = Array.from(nameCard);
const arrLinkCard = Array.from(linkCard);
const deleteCard = document.querySelectorAll('.card__trash-bin');
const deleteCardArray = Array.from(deleteCard); 
const popupExitImg = document.querySelector('.popup__exit-img');


profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)}, fillEditForm());
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});

document.addEventListener('keyup', closeByKeyPopup); 
document.addEventListener('mousedown', clickClosePopupForm); 

popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});
popupExitImg.addEventListener('click', function() {closePopup(popupImg)});


popupForm.addEventListener('submit', editFormSubmitHandler);
popupFormAdd.addEventListener('submit', addFormSubmitHandler);
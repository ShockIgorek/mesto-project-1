import '../index.css';
import { validationConfig, enableValidation, disableButton } from './validate';
import { initialCards, popupImg, createCard, renderCard, containerCards } from './card';
import { profileEditPopup, popupAdd, popupFormAdd, openPopup, closePopup } from './modal';

const cardsContainer = document.querySelector('.cards');
const popupContainer = profileEditPopup.querySelector('.popup__container'); 
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupExit = popupContainer.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const popupFormEdit = document.querySelector('#popup__form-id');
const popupExitImg = document.querySelector('.popup__exit-img');
const profileName = document.querySelector('.profile__name').textContent;
const profileCareer = document.querySelector('.profile__career').textContent;
const popupUserName = profileEditPopup.querySelector('#user-name-field');
const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
const userNameField = document.querySelector('#user-name-field');
const userCareerField = document.querySelector('#user-career-field');
const profileNameContent = document.querySelector('.profile__name');
const profileCareerContent = document.querySelector('.profile__career');
const imgNameField = document.querySelector('#img-name-field');
const imgLinkField = document.querySelector('#img-link-field');
const popupBtnSave = document.querySelector('#create-button');

enableValidation(validationConfig);

initialCards.reverse().forEach(element => {
  const newCard = createCard(element.name, element.link);
  renderCard(newCard, cardsContainer);
}); 


function fillEditForm() {   
    popupUserName.setAttribute('value', profileName);
    popupUserCareer.setAttribute('value', profileCareer);
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();

  profileNameContent.textContent = userNameField.value;
  profileCareerContent.textContent = userCareerField.value;
  closePopup(profileEditPopup);
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();
 
  const newCard = createCard(imgNameField.value, imgLinkField.value);
  
  renderCard(newCard, containerCards);
  closePopup(popupAdd);
  popupFormAdd.reset(); 
  disableButton (popupBtnSave, validationConfig.inactiveButtonClass);
}

profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)}, fillEditForm());
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});

popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});
popupExitImg.addEventListener('click', function() {closePopup(popupImg)});


popupFormEdit.addEventListener('submit', editFormSubmitHandler);
popupFormAdd.addEventListener('submit', addFormSubmitHandler);
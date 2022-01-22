import { containerCards, createCard, renderCard } from "./card";

const profileEditPopup = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupFormAdd = document.querySelector('#popup-form-add');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function closeByKeyPopup(event) {
    const popup = document.querySelectorAll('.popup');
    Array.from(popup).forEach(item => {
      if (event.code === 'Escape') {
        closePopup(item);
      }
    })
}

function clickClosePopupForm(event) {
    const popup = document.querySelectorAll('.popup');
    Array.from(popup).forEach(item => {
      if (event.target.classList.contains('popup')) {
        closePopup(item);
      }
    })
}

function fillEditForm() {
    const profileName = document.querySelector('.profile__name').textContent;
    const profileCareer = document.querySelector('.profile__career').textContent;
    const popupUserName = profileEditPopup.querySelector('#user-name-field');
    const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
    
    popupUserName.setAttribute('value', profileName);
    popupUserCareer.setAttribute('value', profileCareer);
}
  
function editFormSubmitHandler (evt) {
    evt.preventDefault();
  
    const userNameField = document.querySelector('#user-name-field').value;
    const userCareerField = document.querySelector('#user-career-field').value;
  
    const profileName = document.querySelector('.profile__name');
    const profileCareer = document.querySelector('.profile__career');
  
        profileName.textContent = userNameField;
        profileCareer.textContent = userCareerField;
        closePopup(profileEditPopup);
}

function addFormSubmitHandler (evt) {
    evt.preventDefault();
  
    const imgNameField = document.querySelector('#img-name-field').value;
    const imgLinkField = document.querySelector('#img-link-field').value;
    const newCard = createCard(imgNameField, imgLinkField);
    
    renderCard(newCard, containerCards);
    closePopup(popupAdd);
    popupFormAdd.reset(); 
}

export { profileEditPopup, popupAdd, popupFormAdd, openPopup, closePopup, closeByKeyPopup, clickClosePopupForm, editFormSubmitHandler, fillEditForm, addFormSubmitHandler };
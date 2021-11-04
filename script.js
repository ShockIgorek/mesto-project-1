let popup = document.querySelector('.popup'); 
let popupContainer = popup.querySelector('.popup__container');
let popupExit = popupContainer.querySelector('.popup__exit');
let profileEdit = document.querySelector('.profile__edit');

function openProfileForm() {
    popup.classList.add('popup_opened');
    console.log('Клик!');
}

function closeProfileForm() {
    popup.classList.remove('popup_opened');
    console.log('Клик!');
}

profileEdit.addEventListener('click', openProfileForm);
popupExit.addEventListener('click', closeProfileForm);



const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('#user-name-field');
const careerInput = document.querySelector('#user-career-field');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let userNameField = document.querySelector('#user-name-field').value;
    let userCareerField = document.querySelector('#user-career-field').value;

    let profileName = document.querySelector('.profile__name');
    let profileCareer = document.querySelector('.profile__career');

    profileName.textContent = userNameField;
    profileCareer.textContent = userCareerField;

    closeProfileForm();
}

popupForm.addEventListener('submit', formSubmitHandler);
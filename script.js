const popup = document.querySelector('.popup'); 
const popupContainer = popup.querySelector('.popup__container');
const popupExit = popupContainer.querySelector('.popup__exit');
const profileEdit = document.querySelector('.profile__edit');

//Добавление класса popup_opened
function openProfileForm() {
    popup.classList.add('popup_opened');
    console.log('Клик!');
}

//удаление класса popup_opened
function closeProfileForm() {
    popup.classList.remove('popup_opened');
    console.log('Клик!');
}

profileEdit.addEventListener('click', openProfileForm); //открытие формы при клике на .profile__edit
popupExit.addEventListener('click', closeProfileForm); //закрытие формы при клике на .popup__exit

const popupForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('#user-name-field');
const careerInput = document.querySelector('#user-career-field');
const saveButton = document.querySelector('#save-button');

// функция для заполнения имени и карьеры(значение берёт из формы поля "Имя" и "О себе")

function formSubmitHandler (evt) {
    evt.preventDefault();

    let userNameField = document.querySelector('#user-name-field').value;
    let userCareerField = document.querySelector('#user-career-field').value;

    let profileName = document.querySelector('.profile__name');
    let profileCareer = document.querySelector('.profile__career');

    if (userNameField.length === 0 || userCareerField.length === 0) { //проверка на то, чтобы пользователь не оставил пустыми значение полей формы
        alert('Заполните все поля!');
   } else {
        profileName.textContent = userNameField;
        profileCareer.textContent = userCareerField;
        closeProfileForm();
    } 
}

popupForm.addEventListener('submit', formSubmitHandler); //обработчик события 


const popupAdd = document.querySelector('#popup-add');
const profileAdd = document.querySelector('.profile__add');
const exitBtn = document.querySelector('#exit-button');

//Добавление класса popup_opened

function addProfileForm() {
    popupAdd.classList.add('popup_opened');
}

//удаление класса popup_opened

function exitProfileForm() {
    popupAdd.classList.remove('popup_opened');
    console.log('Клик!');
}

profileAdd.addEventListener('click', addProfileForm); //открытие формы при клике на .profile__add
exitBtn.addEventListener('click', exitProfileForm); //закрытие формы при клике на #exit-button


//Активный лайк card__heart_active
//const cardHeart = document.querySelectorAll('.card__heart');

Array.from(document.querySelectorAll('.card__heart')).forEach(heart => {
    heart.addEventListener('click', (event) => {
        event.target.classList.toggle('card__heart_active')
    })
}) 


/*function ClickHeart() {
    cardHeart.classList.toggle('card__heart_active');
} 
cardHeart.addEventListener('click', ClickHeart); */

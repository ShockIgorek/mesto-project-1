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
const createBtn = document.querySelector('#create-button');

//Добавление класса popup_opened

function addProfileForm() {
    popupAdd.classList.add('popup_opened');
}

//удаление класса popup_opened

function exitProfileForm() {
    popupAdd.classList.remove('popup_opened');
    console.log('Клик!');
}

function createNewCard() {
  const containerCards = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#new-card').cloneNode(true).content;
  
  containerCards.prepend(cardTemplate);

  const heart = document.querySelector('.card__heart');
  heart.addEventListener('click', (event) => {
    event.target.classList.toggle('card__heart_active')
})

  const trashBin = document.querySelector('.card__trash-bin');
  trashBin.addEventListener('click', (event) => {
    trashBin.closest('.card').remove();
})
}

profileAdd.addEventListener('click', addProfileForm); //открытие формы при клике на .profile__add
exitBtn.addEventListener('click', exitProfileForm); //закрытие формы при клике на #exit-button


const popupFormAdd = document.querySelector('#popup-form-add');
const imgNameInput = document.querySelector('#img-name-field');
const imgLinkInput = document.querySelector('#img-link-field');

function addFormSubmitHandler (evt) {
    evt.preventDefault();

    const imgNameField = document.querySelector('#img-name-field').value;

    const imgLinkField = document.querySelector('#img-link-field').value;


    if (imgNameField.length === 0 || imgLinkField.length === 0) {
        alert('Заполните все поля!')
    } else {
        createNewCard()
        let newNameCard = document.querySelector('#card-name');
 
        let newLinkCard = document.querySelector('#card-link');

        newNameCard.textContent = imgNameField;
        newLinkCard.setAttribute('src', imgLinkField);
        console.log(`Название изображения: ${imgNameField}, ссылка: ${imgLinkField}`)
        exitProfileForm();
    }
}
popupFormAdd.addEventListener('submit', addFormSubmitHandler);



//добавление при загрузке страницы 6 карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];


const containerCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

containerCards.append(cardTemplate);

const nameCard = document.querySelectorAll('.card__text');
const linkCard = document.querySelectorAll('.card__image');

const arrNameCard = Array.from(nameCard);

const arrLinkCard = Array.from(linkCard);

initialCards.forEach((item, index, array) => {
    arrNameCard[index].textContent = item.name;
}); 

initialCards.forEach((item, index, array) => {
    arrLinkCard[index].setAttribute('src', item.link);
    arrLinkCard[index].setAttribute('alt', item.name);
}) 


//Активный лайк
Array.from(document.querySelectorAll('.card__heart')).forEach(heart => {
  heart.addEventListener('click', (event) => {
      event.target.classList.toggle('card__heart_active')
  })
}) 


//Удаление карточки
const deleteCard = document.querySelectorAll('.card__trash-bin');
const deleteCardArray = Array.from(deleteCard); 

deleteCardArray.forEach(item => {
  item.addEventListener('click', (event) => {
      item.closest('.card').remove();
  })
})

//Окрытие изображения 

Array.from(document.querySelectorAll('.card__image')).forEach(item => {
  item.addEventListener('click', (event) => {
    const popupImg = document.querySelector('.popup-img');
    const popupImgImage = document.querySelector('.popup-img__image');
    const cardName = event.target.closest('.card').textContent;

    let popupImgTitle = document.querySelector('.popup-img__title');
    popupImgTitle.textContent = cardName;

    popupImgImage.setAttribute('src', event.target.getAttribute('src'));

    popupImg.classList.toggle('popup-img_opened');
  })
})

const cross = document.querySelector('.popup-img__exit');

function exitPopupImg() {
  const closePopupImg = document.querySelector('.popup-img');
  closePopupImg.classList.remove('popup-img_opened');
}

cross.addEventListener('click', exitPopupImg);

const popup = document.querySelector('.popup'); 
const popupContainer = popup.querySelector('.popup__container');
const profileEdit = document.querySelector('.profile__edit');

const popupAdd = document.querySelector('#popup-add');
const profileAdd = document.querySelector('.profile__add');



//Добавление класса popup_opened
function openPopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

profileEdit.addEventListener('click', function() {openPopup(popup)});
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});



//удаление класса popup_opened
const popupExit = popupContainer.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

popupExit.addEventListener('click', function() {closePopup(popup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});



//Редактирование имени и информации о себе
const popupForm = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  const userNameField = document.querySelector('#user-name-field').value;
  const userCareerField = document.querySelector('#user-career-field').value;

  let profileName = document.querySelector('.profile__name');
  let profileCareer = document.querySelector('.profile__career');

  if (userNameField.length === 0 || userCareerField.length === 0) { //проверка на то, чтобы пользователь не оставил пустыми значение полей формы
      alert('Заполните все поля!');
 } else {
      profileName.textContent = userNameField;
      profileCareer.textContent = userCareerField;
      closePopup(popup);
  } 
}

popupForm.addEventListener('submit', formSubmitHandler);



//Создание новой карточки
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



//Заполнение полей формы "Название" и "Ссылка на картинку"
const popupFormAdd = document.querySelector('#popup-form-add');

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
      closePopup(popupAdd);
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

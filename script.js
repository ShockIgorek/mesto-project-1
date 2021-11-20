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
const profileEditPopup = document.querySelector('#popup-edit'); 
const popupFullImg = document.querySelector('#popup');
const popupContainer = profileEditPopup.querySelector('.popup__container'); 
const profileEdit = document.querySelector('.profile__edit');
const popupAdd = document.querySelector('#popup-add');
const profileAdd = document.querySelector('.profile__add');
const popupExit = popupContainer.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAdd = document.querySelector('#popup-form-add');
const containerCards = document.querySelector('.cards');
const nameCard = document.querySelectorAll('.card__text');
const linkCard = document.querySelectorAll('.card__image');
const arrNameCard = Array.from(nameCard);
const arrLinkCard = Array.from(linkCard);
const deleteCard = document.querySelectorAll('.card__trash-bin');
const deleteCardArray = Array.from(deleteCard); 
const cross = document.querySelector('.popup-img__exit');
const popupExitImg = document.querySelector('.popup__exit-img');
const popupImg = document.querySelector('#popup-img');

function createCard(name, link) {
  const card = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardColumn = document.createElement('div');
  const cardText = document.createElement('h2');
  const cardBtnHeart = document.createElement('button');
  const cardBtnTrashBin = document.createElement('button');

  card.classList.add('card');
  cardImage.classList.add('card__image');
  cardColumn.classList.add('card__flex-column');
  cardText.classList.add('card__text');
  cardBtnHeart.classList.add('card__heart');
  cardBtnTrashBin.classList.add('card__trash-bin');

  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardText.textContent = name;
  
  card.prepend(cardImage);
  card.append(cardColumn);
  card.append(cardBtnTrashBin);
  cardColumn.prepend(cardText);
  cardColumn.append(cardBtnHeart);

  function likedHeart() {
    cardBtnHeart.classList.toggle('card__heart_active');
  }
  cardBtnHeart.addEventListener('click', likedHeart);

  function deleteCard() {
    const allCard = cardBtnTrashBin.closest('.card');
    allCard.remove();
  }
  cardBtnTrashBin.addEventListener('click', deleteCard);

  function openFullImage() {
    const popupContainerImg = document.querySelector('.popup__container-img');
    const popupImage = popupContainerImg.querySelector('.popup__img');
    const popupName = popupContainerImg.querySelector('.popup__name');

    popupImage.setAttribute('src', link); 
    popupImage.setAttribute('alt', name);
    popupName.textContent = name;
    openPopup(popupImg);
  }

  cardImage.addEventListener('click', function() {openFullImage()});
  
  return card;
}


function renderCard (card, containerCards) {
  containerCards.prepend(card);
}

initialCards.reverse().forEach(element => {
  const newCard = createCard(element.name, element.link);
  const container = document.querySelector('.cards');
  renderCard(newCard, container);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)});
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  const popupForm = popupElement.querySelector('.popup__form');
  if (popupForm !== null) {
    popupForm.reset(); 
  }
}

popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});
popupExitImg.addEventListener('click', function() {closePopup(popupImg)});


function formSubmitHandler (evt) {
  evt.preventDefault();

  const userNameField = document.querySelector('#user-name-field').value;
  const userCareerField = document.querySelector('#user-career-field').value;

  const profileName = document.querySelector('.profile__name');
  const profileCareer = document.querySelector('.profile__career');

      profileName.textContent = userNameField;
      profileCareer.textContent = userCareerField;
      popupForm.reset();
      closePopup(profileEditPopup);
}

popupForm.addEventListener('submit', formSubmitHandler);

function addFormSubmitHandler (evt) {
  evt.preventDefault();

  const imgNameField = document.querySelector('#img-name-field').value;
  const imgLinkField = document.querySelector('#img-link-field').value;
  const newCard = createCard(imgNameField, imgLinkField);
  
  renderCard(newCard, containerCards);
  closePopup(popupAdd);
  popupFormAdd.reset(); 
}
popupFormAdd.addEventListener('submit', addFormSubmitHandler);







/* const profileEditPopup = document.querySelector('.popup'); 
const popupContainer = profileEditPopup.querySelector('.popup__container');
const profileEdit = document.querySelector('.profile__edit');

const popupAdd = document.querySelector('#popup-add');
const profileAdd = document.querySelector('.profile__add');



//Добавление класса popup_opened
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)});
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});



//удаление класса popup_opened
const popupExit = popupContainer.querySelector('.popup__exit');
const exitBtn = document.querySelector('#exit-button');

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});



//Редактирование имени и информации о себе
const popupForm = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
  evt.preventDefault();

  const userNameField = document.querySelector('#user-name-field').value;
  const userCareerField = document.querySelector('#user-career-field').value;

  const profileName = document.querySelector('.profile__name');
  const profileCareer = document.querySelector('.profile__career');

      profileName.textContent = userNameField;
      profileCareer.textContent = userCareerField;
      popupForm.reset();
      closePopup(profileEditPopup);
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



  createNewCard()
  const newNameCard = document.querySelector('#card-name');

  const newLinkCard = document.querySelector('#card-link');

  newNameCard.textContent = imgNameField;
  newLinkCard.setAttribute('src', imgLinkField);
  newLinkCard.setAttribute('alt', imgNameField);
  popupFormAdd.reset();
      
  closePopup(popupAdd);

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
    popupImgImage.setAttribute('alt', cardName);

    popupImg.classList.toggle('popup-img_opened');
  })
})

const cross = document.querySelector('.popup-img__exit');

function exitPopupImg() {
  const closePopupImg = document.querySelector('.popup-img');
  closePopupImg.classList.remove('popup-img_opened');
}

cross.addEventListener('click', exitPopupImg);
*/
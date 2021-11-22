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
  const cardTemplate = document.querySelector('#card').cloneNode(true).content;
  const cardBtnHeart = cardTemplate.querySelector('.card__heart');
  const cardBtnTrashBin = cardTemplate.querySelector('.card__trash-bin');
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardText = cardTemplate.querySelector('.card__text');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardText.textContent = name;

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
  
  return cardTemplate;
}


function renderCard (cardTemplate, containerCards) {
  containerCards.prepend(cardTemplate);
}

initialCards.reverse().forEach(element => {
  const newCard = createCard(element.name, element.link);
  const container = document.querySelector('.cards');
  renderCard(newCard, container);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEdit.addEventListener('click', function() {openPopup(profileEditPopup)}, fillEditForm());
profileAdd.addEventListener('click', function() {openPopup(popupAdd)});

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

popupExit.addEventListener('click', function() {closePopup(profileEditPopup)});
exitBtn.addEventListener('click', function() {closePopup(popupAdd)});
popupExitImg.addEventListener('click', function() {closePopup(popupImg)});

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

popupForm.addEventListener('submit', editFormSubmitHandler);

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
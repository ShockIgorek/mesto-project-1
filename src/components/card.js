import { openPopup } from "./modal";

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
const popupImg = document.querySelector('#popup-img');
const containerCards = document.querySelector('.cards');
const popupContainerImg = document.querySelector('.popup__container-img');
const popupImage = popupContainerImg.querySelector('.popup__img');
const popupName = popupContainerImg.querySelector('.popup__name');

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

export { initialCards, popupImg, containerCards, createCard, renderCard, };
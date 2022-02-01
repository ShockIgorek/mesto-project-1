import { closePopup, openPopup, popupDeleteCard } from "./modal";
import { meId, deleteUserCard, addLikeCard, removeLikeCard } from "./api";

const popupImg = document.querySelector('#popup-img');
const containerCards = document.querySelector('.cards');
const popupContainerImg = document.querySelector('.popup__container-img');
const popupImage = popupContainerImg.querySelector('.popup__img');
const popupName = popupContainerImg.querySelector('.popup__name');
const agreeDeleteCard = popupDeleteCard.querySelector('#delete-button');
let ItemCard;

function createCard(name, link, likesCount, ownerId, likes) {
  const cardTemplate = document.querySelector('#card').cloneNode(true).content;
  const cardLikes = cardTemplate.querySelector('.card__number-likes');
  const cardBtnHeart = cardTemplate.querySelector('.card__heart');
  const cardBtnTrashBin = cardTemplate.querySelector('.card__trash-bin');
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardText = cardTemplate.querySelector('.card__text');
  cardLikes.textContent = likesCount;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardText.textContent = name;
  if (meId == ownerId) {
    cardBtnTrashBin.classList.add('card__trash-bin_visible');
  }

  if (likes.filter(like => like._id == meId).length > 0) {
    cardBtnHeart.classList.toggle('card__heart_active');
  }

  function likedHeart() {    
    if (cardBtnHeart.classList.contains('card__heart_active')) {
      cardLikes.textContent = parseInt(cardLikes.textContent) - 1;
      cardBtnHeart.classList.remove('card__heart_active');
      removeLikeCard(event.target.closest('.card').id);
    } else {
      cardLikes.textContent = parseInt(cardLikes.textContent) + 1;
      cardBtnHeart.classList.add('card__heart_active');
      addLikeCard(event.target.closest('.card').id);
    }
  }
  cardBtnHeart.addEventListener('click', likedHeart);
  
  cardBtnTrashBin.addEventListener('click', function() {
      openPopup(popupDeleteCard); 
      ItemCard = event.target.closest('.card');
  });

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

function deleteCard(card) {
  closePopup(popupDeleteCard);
  deleteUserCard(card.id);
  card.remove(); 

}

agreeDeleteCard.addEventListener('click', () => {deleteCard(ItemCard)}); 

export { popupImg, containerCards, createCard, renderCard };
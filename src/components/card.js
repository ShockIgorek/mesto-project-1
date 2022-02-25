import { api } from "./api-oop";
import { popupImg, popupDeleteCard } from "./popup";
import { popupWithImage } from "./popupWithImage";
import { meId } from "./index";

const containerCards = document.querySelector('.cards');
const popupContainerImg = document.querySelector('.popup__container-img');
const popupImage = popupContainerImg.querySelector('.popup__img');
const popupName = popupContainerImg.querySelector('.popup__name');
const popupDelCard = document.querySelector('#popup-delete-card');
const agreeDeleteCard = popupDelCard.querySelector('#delete-button');
let itemCard;
let itemCardId;

function createCard(name, link, likesCount, ownerId, likes, cardId) {
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
        api.removeLikeCard(cardId)
        //removeLikeCard(cardId)
          .then((result) => {
            cardLikes.textContent = result.likes.length;
            cardBtnHeart.classList.remove('card__heart_active');  
          }) 
          .catch(err => console.log(`Что-то пошло не так: ${err}`));
    } else {
      api.addLikeCard(cardId)
      //addLikeCard(cardId)
        .then((result) => {
          cardLikes.textContent = result.likes.length;
          cardBtnHeart.classList.add('card__heart_active');
        })
        .catch(err => console.log(`Что-то пошло не так: ${err}`));
    }
  }
  cardBtnHeart.addEventListener('click', likedHeart);
  
  cardBtnTrashBin.addEventListener('click', function(event) {
    popupDeleteCard.open();  
    //openPopup(popupDeleteCard); 
      itemCard = event.target.closest('.card');
      itemCardId = cardId;
  });

  //popupWithImage.open(popupImage, popupName);

  function openFullImage() {
    popupWithImage.open(popupName, link, name);
  }

  cardImage.addEventListener('click', function() {openFullImage()});
  
  return cardTemplate;
}

function renderCard (cardTemplate, containerCards) {
  containerCards.prepend(cardTemplate);
}

function deleteCard(card) {
  api.deleteUserCard(itemCardId)
    .then(() => {
      popupDeleteCard.close();
      card.remove(); 
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
}

agreeDeleteCard.addEventListener('click', () => {deleteCard(itemCard)}); 

export { popupImg, containerCards, createCard, renderCard };
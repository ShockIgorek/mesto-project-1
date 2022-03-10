import '../index.css';
import {
  api
} from './Api.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  UserInfo
} from './UserInfo.js';
import {
  Card,
} from './Сard.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  PopupWithForm
} from './PopupWithForm.js';
import {
  Section
} from './Section.js';
import {
  PopupWithDel
} from './PopupWithDel.js';
const config = {
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__error_visible',
  errorClass: 'popup__edit_visible',
}
const cardsContainer = document.querySelector('.cards');
const profileEditPopup = document.querySelector('#popup-edit');
const sectionPopupAdd = document.querySelector('#popup-add');
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const profileAvatar = document.querySelector('.profile__avatar-edit');
const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');
const profileAvatarImg = document.querySelector('.profile__avatar');
const SectionPopupAvatar = document.querySelector('#popup-avatar');
const popupDelCard = document.querySelector('#popup-delete-card');
const popupDelForm = document.querySelector('#delete-form');
const agreeDeleteCard = popupDelCard.querySelector('#delete-button');
const popupFormAvatar = SectionPopupAvatar.querySelector('.popup__form');
const popupFormEdit = document.querySelector('#popup__form-id');
const popupUserName = profileEditPopup.querySelector('#user-name-field');
const popupUserCareer = profileEditPopup.querySelector('#user-career-field');
const userNameField = document.querySelector('#user-name-field');
const userCareerField = document.querySelector('#user-career-field');
const popupBtnCreate = document.querySelector('#create-button');
const popupBtnSave = document.querySelector('#save-button');
const popupAvatarBtnSave = SectionPopupAvatar.querySelector('#save-avatar-btn');
const popupFormAdd = document.querySelector('#popup-form-add');
const cardTemplate = document.querySelector('#card');
const popupNameItem = document.querySelector('.popup__name');
//получение данных
const initialData = [api.getInfo(), api.getCards()]
const popupWithImage = new PopupWithImage('#popup-img', '.popup__img', popupNameItem);
const popupAvatarForm = new PopupWithForm(popupFormAvatar, '#popup-avatar', handleAvatarSubmit);
const popupEditForm = new PopupWithForm(popupFormEdit, '#popup-edit', handleUserInfoFormSubmit);
const popupAddForm = new PopupWithForm(popupFormAdd, '#popup-add', handleCardInfoFormSubmit);
// const popupDelOneCard = new PopupWithForm(popupDelCard, '#popup-delete-card');
const section = new Section(renderCard, cardsContainer);
const formValidatorAvatar = new FormValidator(popupFormAvatar, config)
const formValidatorEdit = new FormValidator(popupFormEdit, config)
const formValidatorAdd = new FormValidator(popupFormAdd, config)
const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileCareer,
})
const deleteCardPopup = new PopupWithDel(popupDelCard, '#popup-delete-card', {
  callbackSubmitForm: (data) => {
    api
      .deleteUserCard(data.cardId)
      .then(() => {
        data.card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
});
deleteCardPopup.setEventListeners();

const deleteCard = (data) => {
  deleteCardPopup.data = data;
  // (console.log(deleteCardPopup.data))
  deleteCardPopup.open();
};

formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
let meId;
let idCard;
let addLikeCard;
let removeLikeCard;
console.log(idCard);

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.getUserInfo();
    changeAvatar(profileAvatarImg, user.avatar);
    meId = user._id;
    // console.log(meId);
    // console.log(cards);

    const createdCards = createCards(cards);
    section.renderItems(createdCards);
    // idCard = card._id;
    // console.log(idCard)
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))

const openImagePopup = (evt) => {
  const data = {
    image: evt.target.src,
    text: evt.target
      .closest(".elements__list-item")
      .querySelector(".elements__text").textContent,
  };
  popupWithImage.open(data);
};

const createCard = (data) => {
  console.log(data)
  const card = new Card(data, cardTemplate, openImagePopup, meId, deleteCard, (addLikeCard = (data) => {
      return api.addLikeCard(data);
    }),
    (removeLikeCard = (data) => {
      return api.removeLikeCard(data);
    }));
  const cardElem = card.createCard(data);
  return cardElem;
}



function createCards(arrCard) {
  return arrCard.map(element => {
    const data = {
      name: element.name,
      link: element.link,
      likesCount: element.likes.length,
      ownerId: element.owner._id,
      likes: element.likes,
      cardId: element._id
    }
    return new Card(data, cardTemplate, openImagePopup, meId, deleteCard, (addLikeCard = (data) => {
        return api.addLikeCard(data.cardId);
      }),
      (removeLikeCard = (data) => {
        return api.removeLikeCard(data.cardId);
      }));
  });
}


function renderCard(card) {
  section.addItem(createCard(card));
}

function changeElementTextContent(elementDOM, objValue) {
  const element = elementDOM;
  element.textContent = objValue;
}

function changeAvatar(elementDOM, objValue) {
  const element = elementDOM;
  element.src = objValue;
}

function fillEditForm() {
  popupUserName.setAttribute('value', profileName.textContent);
  popupUserCareer.setAttribute('value', profileCareer.textContent);
}

function handleEscClose(event) {
  if (event.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup !== null) {
      popup.classList.remove('popup_opened');
      Array.from(document.querySelectorAll('.popup__form')).forEach(form => {
        form.reset();
      })
    }
  }
}

function clickClosePopupForm(event) {
  const popup = document.querySelector('.popup_opened');
  if (event.target.classList.contains('popup')) {
    popup.classList.remove('popup_opened');
    Array.from(document.querySelectorAll('.popup__form')).forEach(form => {
      form.reset();
    })
  }
}

// function deleteCardSubmit(data) {
//   api
//     .deleteUserCard(data.cardId)
//     .then(() => {
//       data.card.remove();
//       deleteCardPopup.close();
//     })
//     .catch((err) => console.log(err));
// }


function handleAvatarSubmit(evt, inputValues) {
  evt.preventDefault();

  api.updateAvatarUser(inputValues)
    .then(() => {
      changeAvatar(profileAvatarImg, inputValues);
      popupAvatarForm.close();
      formValidatorAvatar.disableButton(popupAvatarBtnSave);
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupAvatarBtnSave.textContent = 'Сохранить';
    })
  popupAvatarBtnSave.textContent = 'Сохранение...';
}

function handleUserInfoFormSubmit(evt, inputValues) {
  evt.preventDefault();

  userInfo.setUserInfo(inputValues[0], inputValues[1], popupEditForm.close())
  popupBtnSave.textContent = 'Сохранение...';
}

function handleCardInfoFormSubmit(evt, inputValues) {
  evt.preventDefault();

  api.addNewCard(inputValues[0], inputValues[1])
    .then((card) => {
      const data = {
        name: card.name,
        link: card.link,
        likesCount: card.likes.length,
        ownerId: card.owner._id,
        likes: card.likes,
        cardId: card._id
      }

      const newCard = (data) => new Card(data, cardTemplate, popupWithImage, popupDelCard, api, meId, deleteCard);
      section.addItem(newCard.createCard());
      formValidatorAdd.disableButton(popupBtnCreate);
      popupAddForm.close();
    })
    .catch(err => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => {
      popupBtnCreate.textContent = 'Создать';
    });
  popupBtnCreate.textContent = 'Создание...';
}

document.addEventListener('keyup', (event) => {
  handleEscClose(event)
});
document.addEventListener('mousedown', (event) => {
  clickClosePopupForm(event)
});

profileAvatar.addEventListener('click', function () {
  popupAvatarForm.open();
});
profileEdit.addEventListener('click', function () {
  popupEditForm.open();
  fillEditForm();
});
profileAdd.addEventListener('click', function () {
  popupAddForm.open();
});

// agreeDeleteCard.addEventListener('click', () => {
//   deleteCard(itemCard)
// });



popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();
popupWithImage.setEventListeners();

Promise.all(initialData)
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards)
    meId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, );
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));


export {
  meId,
  idCard,
  popupBtnCreate,
  popupBtnSave,
  popupAvatarBtnSave,
  changeElementTextContent,
  changeAvatar,
  popupWithImage
}
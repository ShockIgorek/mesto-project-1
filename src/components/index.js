import '../index.css';
//константы вынесенны в отдельный файл для удобства
import {validationСonfig} from './constants.js'
import {
  Api
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
//авторизация
let meId;
let idCard;
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
  headers: {
      authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
      'Content-Type': 'application/json'
  }
});
//получение данных с сервера
const getData = [api.getInfo(), api.getCards()];
//увелечение картинки
const popupWithImage = new PopupWithImage('#popup-img', '.popup__img', popupNameItem);
popupWithImage.setEventListeners();
const openImagePopup = (evt) => {
  const data = {
    image: evt.target.src,
    text: evt.target.closest(".card").querySelector(".card__text").textContent,
  };
  popupWithImage.open(data);
};
//создание карточки:
let addLikeCard;
let removeLikeCard;
const deleteCard = (data) => {
  popupWithDel.data = data;
  popupWithDel.open();
};

const createCard = (data) => {
  console.log(data)
  const card = new Card(data, cardTemplate, openImagePopup, meId, deleteCard, (addLikeCard = (data) => {
      return api.addLikeCard(data);
    }),
    (removeLikeCard = (data) => {
      return api.removeLikeCard(data);
    }));
  const cardElem = card.createCard();
  return cardElem;
}
// удаление карточки

const popupWithDel = new PopupWithDel('#popup-delete-card', {
  callbackSubmitForm: (data) => {
    api
      .deleteUserCard(data.cardId)
      .then(() => {
        data.card.remove;
        console.log(data.card)
        popupWithDel.close();
        renderCard()
      })
      .catch((err) => console.log(err));
  },
});
popupWithDel.setEventListeners();



const popupAvatarForm = new PopupWithForm(popupFormAvatar, '#popup-avatar', handleAvatarSubmit);
const popupEditForm = new PopupWithForm(popupFormEdit, '#popup-edit', handleUserInfoFormSubmit);
const popupAddForm = new PopupWithForm(popupFormAdd, '#popup-add', handleCardInfoFormSubmit);
// const popupDelOneCard = new PopupWithForm(popupDelCard, '#popup-delete-card');
const section = new Section(renderCard, cardsContainer);
const formValidatorAvatar = new FormValidator(popupFormAvatar, validationСonfig)
const formValidatorEdit = new FormValidator(popupFormEdit, validationСonfig)
const formValidatorAdd = new FormValidator(popupFormAdd, validationСonfig)
const userInfo = new UserInfo({
  userName: profileName,
  userAbout: profileCareer,
})


formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();
// console.log(idCard);

api.getAppInfo()
  .then(([user, cards]) => {
    userInfo.getUserInfo();
    changeAvatar(profileAvatarImg, user.avatar);
    meId = user._id;
    const createdCards = createCards(cards);
    section.renderItems(createdCards);
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))





function createCards(arrCard) {
  return arrCard.map(data => {
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

Promise.all(getData)
  .then(([userData, cards]) => {
    // console.log(userData);
    // console.log(cards)
    meId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, );
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));


export {
  api,
  meId,
  idCard,
  popupBtnCreate,
  popupBtnSave,
  popupAvatarBtnSave,
  changeElementTextContent,
  changeAvatar,
  popupWithImage
}
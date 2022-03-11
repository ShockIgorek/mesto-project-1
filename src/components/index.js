import '../index.css';
//константы вынесенны в отдельный файл для удобства
import {
  validationConfig,
  editProfilePopup,
  avatarEditPopup,
  profileEditButton,
  profileAvatarEditButton,
  addCardPopup,
  cardDeletePopup,
  profileJob,
  profileName,
  profileAvatar,
  cardTemplate,
  openPicturePopup,
  editProfileNameInput,
  editProfileJobInput,
  profileAddButton,
cardsContainer} from './constants.js'
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
  PopupConfirm
} from './PopupWithDel.js';
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
  headers: {
      authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
      'Content-Type': 'application/json'
  }
})

//* Переменные для id пользователя и лайков
let userId, addCardLike, deleteCardLike;

const initialData = [api.getInfo(), api.getInitialCards()];

//* Попап с фото
const popupWithImage = new PopupWithImage(openPicturePopup);
popupWithImage.setEventListeners();

//* Открытие попапа с фото
const openImagePopup = (evt) => {
  const data = {
    image: evt.target.src,
    text: evt.target.closest(".elements__list-item").querySelector(".elements__text").textContent,
  };
  popupWithImage.open(data);
};

const deleteCard = (data) => {
  deleteCardPopup.data = data;
  deleteCardPopup.open();
};

//* Создание карточки
const createCard = (data) => {
  console.log(data)
  const card = new Card(
    data,
    '#card',
    userId,
    openImagePopup,
    deleteCard,
    (addCardLike = (data) => {
      return api.addCardLike(data);
    }),
    (deleteCardLike = (data) => {
      return api.deleteCardLike(data);
    })
  );
  const cardElement = card.createCard(data);
  return cardElement;
};

//* Попап удаления карточки
const deleteCardPopup = new PopupConfirm(cardDeletePopup, {
  formSubmitCallBack: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
});
deleteCardPopup.setEventListeners();

//* Генерация карточек
const section = new Section(
  {
    renderItems: (data) => {
      section.addItem(createCard(data));
    },
  },
  cardsContainer
);

//* Попап редактирования профиля
const userInfo = new UserInfo({ profileName, profileJob, profileAvatar });

const editPopup = new PopupWithForm(editProfilePopup, {
  formSubmitCallBack: (data, button) => {
    api
      .editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {

      });
  },
});
editPopup.setEventListeners();

//* Попап редактирования аватарки
const avatarEdit = new PopupWithForm(avatarEditPopup, {
  formSubmitCallBack: (data, button) => {
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        avatarEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      });
  },
});
avatarEdit.setEventListeners();

//* Попап добавления карточки
const addNewCardPopup = new PopupWithForm(addCardPopup, {
  formSubmitCallBack: (data, button) => {
    const item = {
      name: data.placeName,
      link: data.placeLink,
    };
    api
      .addNewCard(item)
      .then((res) => {
        section.addItem(createCard(res), true);
        addNewCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      });
  },
});
addNewCardPopup.setEventListeners();


//* Установка слушателей
profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editProfileNameInput.value = data.name;
  editProfileJobInput.value = data.job;
  editPopup.open();
  profileEditButton.blur();
});
profileAddButton.addEventListener("click", () => {
  addNewCardPopup.open();
  profileAddButton.blur();
});
profileAvatarEditButton.addEventListener("click", () => {
  avatarEdit.open();
  profileAvatarEditButton.blur();
});

//* Запрос данных сервера для превой отрисовки страницы
Promise.all(initialData)
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    section.renderItems(cards.reverse());
  })
  .catch((err) => console.log(err));


  const formValidatorAvatar = new FormValidator(avatarEditPopup, validationConfig);
const formValidatorEdit = new FormValidator(editProfilePopup, validationConfig);
const formValidatorAdd = new FormValidator(addCardPopup, validationConfig);
formValidatorAvatar.enableValidation();
formValidatorEdit.enableValidation();
formValidatorAdd.enableValidation();

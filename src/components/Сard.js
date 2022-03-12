//* Класс карточки
export class Card {
    constructor(
        data,
        cardTemplate,
        userId,
        imagePopup,
        deleteCard,
        addCardLike,
        deleteCardLike
    ) {
        this._data = data; //* полные данные о карточке
        this._Template = cardTemplate; //* класс шаблона разметки
        this._userId = userId; //* id профиля
        this._cardId = data._id; //* id карточки
        this._cardOwnerId = data.owner._id; //* id владельца карточки
        this._imagePopup = imagePopup; //* функция открытия попапа с фото
        this._element = this._getTemplate(); //* разметка карточки
        this._likeButton = this._element.querySelector(".card__heart");
        this._likeCounter = this._element.querySelector(".card__number-likes");
        this._deleteButton = this._element.querySelector('.card__trash-bin');
        this._deleteCard = deleteCard;
        this._addCardLike = addCardLike;
        this._deleteCardLike = deleteCardLike;
    }

    //* Получение шаблона разметки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._Template).cloneNode(true).content;
        return cardElement;
    }

    //* Создание карточки
    createCard() {
        this._setEventListeners();
        const cardImage = this._element.querySelector(".card__image");
        cardImage.alt = `${this._data.name}`;
        cardImage.src = this._data.link;
        this._element.querySelector(
            ".card__text"
        ).textContent = this._data.name;
        this._element.querySelector(
            ".card__number-likes"
        ).textContent = this._data.likes.length;
        this._setIsLiked();
        return this._element;
    }

    //* Установка слушателей
    _setEventListeners() {
        if (this._cardOwnerId === this._userId) {
            this._deleteButton.classList.add("elements__delete-button_active");
            this._deleteButton.addEventListener("click", () =>
                this._deleteButtonClick()
            );
        }

        this._likeButton.addEventListener("click", () => this._likeToggler());

        this._element
            .querySelector(".card__image")
            .addEventListener("click", this._imagePopup);
    }

    //* Переключение состояния лайка
    _likeToggler() {
        if (!this._likeButton.classList.contains("card__heart_active")) {
            this._addCardLike(this._cardId)
                .then((res) => {
                    this._data = res;
                    this._likeCounter.textContent = res.likes.length;
                    this._likeButton.classList.add("card__heart_active");
                })
                .catch((err) => console.log(err));
        } else {
            this._deleteCardLike(this._cardId)
                .then((res) => {
                    this._data = res;
                    this._likeCounter.textContent = res.likes.length;
                    this._likeButton.classList.remove("card__heart_active");
                })
                .catch((err) => console.log(err));
        }
    }

    _setIsLiked() {
        //* Условие будет true если в массиве лайков найдется лайк с id пользователя
        if (this._data.likes.some(elem => elem._id === this._userId)) {
            this._likeButton.classList.add("card__heart_active");
        }
    }

    //* Удаление карточки
    _deleteButtonClick() {
        const data = {
            card: this._element,
            cardId: this._cardId,
        };
        this._deleteCard(data);
    }
}



// //проверка лайка
// _isCardLiked() {
//     if (this._likes.some((user) => {
//             return this._userId === user._id;
//         })) {
//         this._likeBtn.classList.add('element__like-btn_active');
//     }
// }

// // поставить/удалить лайк, изменение количества лайков
// likedHeart() {
//     if (this._likeBtn.classList.contains('card__heart_active')) {
//         this._api.removeLikeCard(this._cardId)
//             .then((result) => {
//                 this._likesNumber.textContent = result.likes.length;
//                 this._likeBtn.classList.remove('card__heart_active');
//             })
//             .catch(err => console.log(`Что-то пошло не так: ${err}`));
//     } else {
//         this._api.addLikeCard(this._cardId)
//             .then((result) => {
//                 this._likesNumber.textContent = result.likes.length;
//                 this._likeBtn.classList.add('card__heart_active');
//             })
//             .catch(err => console.log(`Что-то пошло не так: ${err}`));
//     }
// }
// // удаление карточки
// _deleteBtnClick() {
//     const data = {
//         card: this._element,
//         cardId: this._cardId,
//     };
//     this._deleteCard(data);
// }
// // проверяем владельца карточки и убираем кнопку Delete
// _hasDeleteBtn() {
//     if (this._userId !== this._cardOwnerId) {
//         this._deleteBtn.remove();
//     }
// }

// renderCard() {
//     document.querySelector('.cards').prepend(this.createCard());
// }
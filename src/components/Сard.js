export class Card {
    constructor(data, template, OpenImage, meId, deleteCard, addLike, deleteLike) {
        this._data = data;
        this._template = template;
        this._meId = meId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
        this._imagePopup = OpenImage;
        this._element = this._getTemplate();
        this._likeBtn = this._element.querySelector('.card__heart');
        this._likesNumber = this._element.querySelector('.card__number-likes');
        this._deleteBtn = this._element.querySelector('.card__trash-bin');
        this._deleteCard = deleteCard;
        this._addLike = addLike;
        this._deleteLike = deleteLike;

    }


    // Получаем шаблон карточки
    _getTemplate() {
        return this._template.cloneNode(true).content;
    }

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
    _setEventListeners() {
        if (this._cardOwnerId === this._meId) {
            this._deleteBtn.classList.add("card__trash-bin_visible");
            this._deleteBtn.addEventListener("click", () =>
                this._deleteButtonClick()
            );
        }

        this._likeBtn.addEventListener("click", () => this._likeToggler());

        this._element
            .querySelector(".card__image")
            .addEventListener("click", this._imagePopup);
    }
    _likeToggler() {
        if (!this._likeBtn.classList.contains("card__heart_active")) {
            this._addLike(this._cardId)
                .then((res) => {
                    console.log(res)
                    this._data = res;
                    this._likesNumber.textContent = res.likes.length;
                    this._likeBtn.classList.add("card__heart_active");
                })
                .catch((err) => console.log(err));
        } else {
            this._deleteLike(this._cardId)
                .then((res) => {
                    this._data = res;
                    this._likesNumber.textContent = res.likes.length;
                    this._likeBtn.classList.remove("card__heart_active");
                })
                .catch((err) => console.log(err));
        }
    }

    _setIsLiked() {
        //* Условие будет true если в массиве лайков найдется лайк с id пользователя
        if (this._data.likes.some(elem => elem._id === this._meId)) {
            this._likeBtn.classList.add("card__heart_active");
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
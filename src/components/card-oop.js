import {
    api
} from "./api-oop";

import {
    popupImg,
    popupDeleteCard
} from "./popup-oop";
import {
    popupWithImage
} from "./PopupWithImage";
import {
    meId
} from "./index";

export class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
        this._likesCount = data.likesCount;
        this._ownerId = data.ownerId;
        this._likes = data.likes;
        this._cardId = data.cardId
    }
    // Получаем шаблон карточки
    _getTemplate() {
        this._card = document.querySelector('#card').cloneNode(true).content;
        return this._card;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        // открытие попапа просмотра изображения кликом по изображению
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
        // слушатель кнопки удаления карточки
        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteIconClick(this._cardId);
        })
        // слушатель кнопки лайк
        this._likeBtn.addEventListener('click', () => {
            if (this._likeBtn.classList.contains('element__like-btn_active')) {
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        })
    }
    createCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');;
        this._likeBtn = this._element.querySelector('.card__heart');
        this._likesNumber = this._element.querySelector('.card__number-likes');
        this._deleteBtn = this._element.querySelector('.card__trash-bin');
        this._text = this._element.querySelector('.card__text');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._text.textContent = this._name;
        this._hasDeleteBtn();
        this._isCardLiked();
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();

        return this._element;
    }

    // Проверка, стоит ли лайк на карточке
    _isCardLiked() {
        if (this._likes.some((user) => {
                return this._userId === user._id;
            })) {
            this._likeBtn.classList.add('element__like-btn_active');
        }
    }

    // поставить/удалить лайк, изменение количества лайков
    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeBtn.classList.toggle('element__like-btn_active');
    }

    // проверяем владельца карточки и убираем кнопку Delete
    _hasDeleteBtn() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteBtn.remove();
        }
    }
}



import { popupBtnCreate, popupBtnSave, popupAvatarBtnSave, changeElementTextContent, changeAvatar, initialAllCards } from './index.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6/',
    headers: {
        authorization: 'c6ea2481-28ed-4e6a-9bbe-85a531661bf0',
        'Content-type': 'application/json'
    }
};

let meId;

const getInfo = () => {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
    }
    
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })

    .then((result) => {
        changeElementTextContent(document.querySelector('.profile__name'), result.name); 
        changeElementTextContent(document.querySelector('.profile__career'), result.about);
        changeAvatar(document.querySelector('.profile__avatar'), result.avatar);
        meId = result._id; 
    });
}

const getCards = () => {
    getInfo();
    return fetch(`${config.baseUrl}cards`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

    return Promise.reject(`Что-то пошло не так: ${res.status}`); 
    })

    .then((result) => {
        initialAllCards(result);
    })
}

const getAppInfo = () => {
    return Promise.all([getInfo(), getCards()]);
}

const sendInfo = (myName, aboutMe) => {
    popupBtnSave.textContent = 'Сохранение...';
    fetch (`${config.baseUrl}users/me`, {
        method: 'PATCH', 
        headers: config.headers,
        body: JSON.stringify({
            name: myName,
            about: aboutMe
        })
    }); 
}

const addNewCard = (namePlace, placeLink) => {
    popupBtnCreate.textContent = 'Создание...';
    fetch (`${config.baseUrl}cards`, {
        method: 'POST',
        headers: config.headers, 
        body: JSON.stringify({
            name: namePlace,
            link: placeLink
        })
    });
}

const deleteUserCard = (id) => {
    fetch (`${config.baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

    Promise.reject(`Что-то пошло не так: ${res.status}`); 
    })
}

const addLikeCard = (id) => {
    fetch (`${config.baseUrl}cards/likes/${id}`, {
        method: 'PUT', 
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

    Promise.reject(`Что-то пошло не так: ${res.status}`)
    })
}

const removeLikeCard = (id) => {
    fetch (`${config.baseUrl}cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

    Promise.project(`Что-то пошло не так: ${res.status}`);
    })
}

const updateAvatarUser = (imgLink) => {
    popupAvatarBtnSave.textContent = 'Сохранение...';
    fetch (`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${imgLink}`
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

    Promise.reject(`Что-то пошло не так: ${res.status}`)
    })
}

export { meId, getInfo, getCards, sendInfo, getAppInfo, addNewCard, deleteUserCard, addLikeCard, removeLikeCard, updateAvatarUser };
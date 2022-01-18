const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
    inputErrorClass: 'popup__error_visible',
    errorClass: 'popup__edit_visible',
};

//Показываем ошибку
function showInputError (inputElement, inputErrorClass, errorClass, errorElement, errorMessage) {
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

//Скрываем ошибку
function hideInputError (inputElement, inputErrorClass, errorClass, errorElement) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

//Проверка валидности 
function checkInputValidity (formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Находим элемент ошибки (span)
    //Если свойство valid == true, значит инпут валидный
    if (inputElement.validity.valid) {
        //ошибок нет
        hideInputError(inputElement, inputErrorClass, errorClass, errorElement);
    } else {
        //ошибки есть
        showInputError(inputElement, inputErrorClass, errorClass, errorElement, inputElement.validationMessage);
    }
};

//Проверяет имеются ли инвалидные импуты
function hasInvalidInput (inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

//кнопка в состояние disable
function disableButton (buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

//кнопка в состояние undisable
function enablaButton (buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
};

//Переключение состояния кнопки
function toggleButtonState (formElement, inputList, submitButtonSelector, inactiveButtonClass) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    //Если есть хотя бы 1 инвалидный инпут
    if (hasInvalidInput(inputList)) {
        //Делаем кнопку не активной
        disableButton(buttonElement, inactiveButtonClass);
    } else {
        //Делаем кнопку активной
        enablaButton(buttonElement, inactiveButtonClass);
    }
};

function setEventListeners (formElement, {inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //Находим все input внутри формы
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
        });
    });

    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
};

function enableValidation ({formSelector, ...rest}) {
    const formList = Array.from(document.querySelectorAll(formSelector)); //Находим все формы и переводим их в массив
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); //Для каждой формы отключаем поведение формы по умолчанию
        });

        setEventListeners(formElement, rest);
    });
};

enableValidation(validationConfig);
/*
const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__edit');

//Функция, которая добавляет класс с ошибкой
function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        if (errorElement !== null) { 
            inputElement.classList.add('popup__edit_type_error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('popup__edit_active');
        }
}

//Функция, которая удаляет класс с ошибкой 
function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        if (errorElement !== null) {
            inputElement.classList.remove('popup__edit_type_error');
            errorElement.classList.remove('popup__edit_active');
            errorElement.textContent = '';
        }
}

//Функция, которая проверяет валидность поля 
function isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

//Функция, которая проверяет валидацию всех полей(принимает массив полей формы и возвращает true, если поле не валидно, false - если все поля валидны)
function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//Функция которая меняет состояние кнопки
function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit_inactive');
    } else {
        buttonElement.classList.remove('popup__submit_inactive');
    }
}

function setEventListeners (formElement) {
    const inputList = Array.from(document.querySelectorAll('.popup__edit'));
    const buttonElement = document.querySelector('.popup__save-btn');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid (formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners (formElement);
    });
}

enableValidation (); 
*/

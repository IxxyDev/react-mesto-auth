/*export const popupConfig = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  popupEditProfileSelector: '.popup_type_edit-profile',
  popupCreateCardSelector: '.popup_type_add-new-card',
  popupZoomedImgSelector: '.popup_type_zoom-image',
  popupImgSelector: '.popup__zoom-image',
  popupFigcaptionSelector: '.popup__description',
  inputSelector: '.popup__input',
  inputNameSelector: '.popup__input_type_name',
  inputDescriptionSelector: '.popup__input_type_description',
  submitButtonSelector: '.popup__button',
};

export const cardConfig = {
  cardSelector: '#card',
  cardsContainerSelector: '.elements',
  cardElementSelector: '.element',
  cardDeleteSelector: '.element__delete-button',
  cardLikeSelector: '.element__like-button',
  cardImgSelector: '.element__image',
  cardTitleSelector: '.element__title',
};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorSelector: '.popup__input-error_active',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const profileConfig = {
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
};

export const editProfilePopup = document.querySelector(
  popupConfig.popupEditProfileSelector
);
export const createCardPopup = document.querySelector(
  popupConfig.popupCreateCardSelector
);
export const editAvatarPopup = document.querySelector(
  '.popup_type_avatar-edit'
);
export const editButton = document.querySelector(
  profileConfig.editButtonSelector
);
export const addButton = document.querySelector(
  profileConfig.addButtonSelector
);
export const popupForms = Array.from(
  document.querySelectorAll(popupConfig.formSelector)
);

export const profileName = editProfilePopup.querySelector(
  popupConfig.inputNameSelector
);
export const profileDescription = editProfilePopup.querySelector(
  popupConfig.inputDescriptionSelector
);
export const addCardName = document.querySelector(
  popupConfig.inputNameSelector
);
export const addCardUrl = createCardPopup.querySelector(
  popupConfig.inputDescriptionSelector
);
export const avatar = document.querySelector('.profile__avatar-background');
export const changeAvatarForm = editAvatarPopup.querySelector('.popup__form');

*/
//for api

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12/';
export const headers = {
  authorization: 'd6770652-b28e-4007-834e-116536b370da',
  'Content-Type': 'application/json',
};

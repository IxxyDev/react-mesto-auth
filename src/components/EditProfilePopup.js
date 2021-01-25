import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


const EditProfilePopup = ({isOpened, onClose, onUpdateUser}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = e => setName(e.target.value)
  const handleAboutChange = e => setDescription(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_name"
             value={name}
             onChange={handleNameChange}
             name="name"
             type="text"
             id="name-input"
             required
             minLength="2"
             maxLength="40"
             pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"/>
      <span className='popup__input-error' id='name-input-error'></span>
      <input className="popup__input popup__input_type_description"
             value={description}
             onChange={handleAboutChange}
             name="description"
             type="text"
             id="description-input"
             required minLength="2"
             maxLength="200"/>
      <span className='popup__input-error' id='description-input-error'></span>
      <button type="submit" className="popup__button">Сохранить</button>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
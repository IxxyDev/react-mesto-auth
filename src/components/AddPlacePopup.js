import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpened, onClose, onAddPlace}) => {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-new-card"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        value={name}
        name="name"
        type="text"
        id="card-name-input"
        required
        minLength="1"
        maxLength="30"
        placeholder="Название места"/>
      <span className='popup__input-error' id='card-name-input-error'></span>
      <input
        className="popup__input popup__input_type_description"
        value={link}
        type="url"
        name="link"
        id="card-url-input"
        required placeholder="Ссылка на картинку"
        pattern=".+\.(jpg|png)"/>
      <span className='popup__input-error' id='card-url-input-error'></span>
      <button type="submit" className="popup__button"></button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
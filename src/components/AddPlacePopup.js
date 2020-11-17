import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpened, onClose, onAddPlace}) {
  const inputName = React.useRef();
  const inputLink = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: inputName.current.value,
      link: inputLink.current.value
    });
  }

  return (
    <PopupWithForm title="Новое место"
                   name="add-new-card"
                   isOpened={isOpened}
                   onClose={onClose}
                   onSubmit={handleAddPlaceSubmit}
                   children={
                     <form className="popup__form popup__form_type_add-card"
                           name="form"
                           method="POST"
                           noValidate>
                       <input className="popup__input popup__input_type_name"
                              ref={inputName}
                              defaultValue={''}
                              name="name"
                              type="text"
                              id="card-name-input"
                              required
                              minLength="1"
                              maxLength="30"
                              placeholder="Название места"/>
                       <span className='popup__input-error' id='card-name-input-error'></span>
                       <input className="popup__input popup__input_type_description"
                              ref={inputLink}
                              defaultValue={''}
                              type="url"
                              name="link"
                              id="card-url-input"
                              required placeholder="Ссылка на картинку"
                              pattern=".+\.(jpg|png)"/>
                       <span className='popup__input-error' id='card-url-input-error'></span>
                     </form>

                   } />
  )
}

export default AddPlacePopup;
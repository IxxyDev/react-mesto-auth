import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditAvatarPopup =({ isOpened, onClose, onUpdateAvatar }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();
  const [imgLink, setImgLink] = useState('')

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
        avatar: avatarRef.current.value
      }
    );
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <form className="popup__form popup__form_type_edit-avatar"
              name="form"
              method="POST"
              noValidate>
          <input className="popup__input popup__input_type_description"
                 defaultValue={imgLink}
                 ref={avatarRef}
                 type="url"
                 name="link"
                 id="avatar-url-input"
                 required
                 placeholder="Ссылка на картинку"
                 pattern=".+\.(jpg|png)"
                 onChange={e => setImgLink(e.target.value)}
          />
          <span className='popup__input-error' id='avatar-url-input-error'></span>
          <button type="submit" className="popup__button">Сохранить</button>
        </form>
      } />
  )
}

export default EditAvatarPopup;
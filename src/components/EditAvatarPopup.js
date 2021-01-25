import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpened, onClose, onUpdateAvatar}) => {
  const [imgLink, setImgLink] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onUpdateAvatar({avatar: imgLink})
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_description"
             value={imgLink}
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
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
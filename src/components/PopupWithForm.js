import React from 'react';

const PopupWithForm = ({ name, isOpened, title, children, onClose, onSubmit }) => {

  return (
      <section className={`popup popup_type_${name} ${isOpened && "popup_is-opened"}`}>
        <div className="popup__content">
          <button className="popup__close-button popup__close-button_type_edit-profile" onClick={onClose} type="button"/>
          <h3 className="popup__title">{title}</h3>
          <form
            className="popup__form"
            onSubmit={onSubmit}
            name={name}
            noValidate
            method="POST"
          >
            {children}
          </form>
        </div>
      </section>
  )
}

export default PopupWithForm;
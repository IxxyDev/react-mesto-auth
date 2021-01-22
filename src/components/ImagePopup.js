import React from 'react';

const ImagePopup = ({ isOpened, card, onClose }) => {
   return (
      <section className={`popup popup_type_zoom-image ${isOpened && "popup_is-opened"}`}>
        <figure className="popup__image-container">
          <button className="popup__close-button popup__close-button_type_zoom-image" type="button" onClick={onClose}></button>
          <img src={card.link} alt={card.name} className="popup__zoom-image" />
          <figcaption className="popup__description">{card.name}</figcaption>
        </figure>
      </section>
   );
}

export default ImagePopup
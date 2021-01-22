import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const Card = ({ card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(card => card._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

    return (
      <div id="card">
        <div className="element">
          <img
            src={card.link}
            alt={card.name}
            className="element__image"
            onClick={handleClick}
            />
          <div className="element__description">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
              <button type="submit" onClick={handleLikeClick} className={`element__like-button ${isLiked && 'element__like-button_active'}`}></button>
              <span className="element__like-counter">{card.likes.length}</span>
            </div>
          </div>
          <button type="submit" onClick={handleDeleteClick} className={`element__delete-button ${isOwn && 'element__delete-button_visible'}`}></button>
        </div>
      </div>
    );
}

export default Card;
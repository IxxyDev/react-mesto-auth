import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-background" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt='' />
          </div>
          <div className="profile__data">
            <div className="profile__wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card, i) =>
          (
            <Card key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} card={card}/>
          )
        )}
      </section>
    </main>
  );
}

export default Main;
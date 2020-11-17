import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [image, setImage] = React.useState({
    link: '',
    name: ''
  });


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  function handleLikeCard(card) {
    const isLiked = card.likes.some(owner => owner._id === currentUser._id);
    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    api.changeUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(cardData) {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatarData) {
    api.changeUserAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }

  function handleCardClick(props) {
    setSelectedCard(true);
    setImage({link: props.link, name: props.name});
  }

  function closeAllPopups () {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleLikeCard}
              onCardDelete={handleCardDelete}
              cards={cards}
        />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpened={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpened={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpened={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm title="Вы уверены?" name="delete-card" btnText={'Да'} />
        <ImagePopup card={image}
                    onClose={closeAllPopups}
                    isOpened={selectedCard} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
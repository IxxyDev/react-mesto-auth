import React, {useCallback, useState, useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom'
import * as auth from '../utils/auth'
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
import {getToken, removeToken, setToken} from "../utils/token";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [userData, setUserData] = useState({email: '', password: ''})
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState({
    link: '',
    name: ''
  });
  const [userEmail, setUserEmail] = useState('')
  const history = useHistory()

  useEffect(() => {
    tokenCheck()
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //const handleSetUserEmail = useCallback(email => setUserEmail(email), [])

  const tokenCheck = () => {
    const jwt = getToken()
    if (!jwt) return
    auth.getContent(jwt).then(res => {
      if (res.data) {
        setLoggedIn(true)
        setUserEmail(res.data.email)
        history.push('/')
      }
    })
  }

  const handleLogin = userData => {
    setUserData(userData)
    setLoggedIn(true)
  }


  const handleLikeCard = card => {
    const isLiked = card.likes.some(owner => owner._id === currentUser._id);
    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  const handleUpdateUser = userData => {
    api.changeUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleAddPlace = cardData => {
    api.addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = avatarData => {
    api.changeUserAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }

  const handleCardClick = ({link, name}) => {
    setSelectedCard(true);
    setImage({link, name});
  }

  const closeAllPopups = () => {
    setEditAvatarPopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setSelectedCard(false);
  }

  const handleLogout = path => {
    if (path === '/') {
      removeToken()
      setLoggedIn(false)
      setCurrentUser({})
      setUserEmail('')
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onLogout={handleLogout} loggedIn={loggedIn}/>
        <ProtectedRoute exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleLikeCard}
                        onCardDelete={handleCardDelete}
                        cards={cards}
        />
        <Route path="/signin">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
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
        <InfoTooltip />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
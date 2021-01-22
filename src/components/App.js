import React, {useState, useEffect} from 'react';
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
import {api} from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {removeToken, setToken} from "../utils/token";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState({
    link: '',
    name: ''
  });
  const [infoTooltip, setInfoTooltip] = useState({image: '', isOpened: false, message: ''})
  const [userEmail, setUserEmail] = useState('')
  const history = useHistory()

  useEffect(() => {
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

  const tokenCheck = () => {
    if (localStorage.token) {
      auth.getContent(localStorage.token)
        .then(res => {
          if (res.data) {
            setLoggedIn(true)
            setUserEmail(res.data.email)
            history.push('/')
          } else {
            removeToken()
            setLoggedIn(false)
            setCurrentUser({})
            setUserEmail('')
          }
        })
    }
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          setToken(data.token)
          setLoggedIn(true)
          history.push('/')
          tokenCheck()
        }
      }).catch(err => {
        debugger
      if (err.response.status === 401) {
        setInfoTooltip({
          message: 'Некорректно заполнено одно из полей',
          image: 'fail',
          isOpened: true
        })
      } else if (err.response.status === 400) {
        setInfoTooltip({message: 'Неправильный логин или пароль', image: 'fail', isOpened: true})
      } else {
        setInfoTooltip({
          message: 'Что-то пошло не так! Попробуйте ещё раз',
          image: 'fail',
          isOpened: true
        })
      }
    })
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(res => {
        if (res.data) {
          setInfoTooltip({
            message: 'Вы успешно зарегистрировались!',
            image: 'succeed',
            isOpened: true
          })
          history.push('/signin')
        }
      }).catch(err => {
      if (err.response.status === 400) {
        setInfoTooltip({
          message: 'Некорректно заполнено одно из полей',
          image: 'fail',
          isOpened: true
        })
      } else if (err.response.status === 409) {
        setInfoTooltip({message: 'Вы уже зарегистрированы', image: 'fail', isOpened: true})
      } else {
        setInfoTooltip({
          message: 'Что-то пошло не так! Попробуйте ещё раз',
          image: 'fail',
          isOpened: true
        })
      }
    })
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
      .then(userInfo => {
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
    setIsEditAvatarPopupOpened(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpened(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpened(true);
  }

  const handleCardClick = ({link, name}) => {
    setSelectedCard(true);
    setImage({link, name});
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setSelectedCard(false);
    setInfoTooltip({...infoTooltip, isOpened: false})
  }

  const handleLogout = () => {
      removeToken()
      setLoggedIn(false)
      setCurrentUser({})
      setUserEmail('')
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
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route path="/signup">
          <Register handleRegister={handleRegister}/>
        </Route>
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpened={isEditProfilePopupOpened}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpened={isEditAvatarPopupOpened}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpened={isAddPlacePopupOpened}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm title="Вы уверены?" name="delete-card" btnText={'Да'}/>
        <ImagePopup card={image}
                    onClose={closeAllPopups}
                    isOpened={selectedCard}/>
        <InfoTooltip image={infoTooltip.image}
                     isOpened={infoTooltip.isOpened}
                     onClose={closeAllPopups}
                     message={infoTooltip.message}
        />
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
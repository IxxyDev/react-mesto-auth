import React from 'react';
import logoPath from "../images/logo.svg";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {NavLink, useLocation} from "react-router-dom";

const Header = ({loggedIn, onLogout}) => {
  const currentUser = React.useContext(CurrentUserContext)
  const location = useLocation()
  const title = `${location.pathname === "/signup" ? "Войти" : "Регистрация" }`
  const path = `${location.pathname === "/signup" ? "singin" : "singup" }`

  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logoPath} alt="Логотип проекта 'Место'"/>
        {loggedIn ? (
          <div className="header__login-container">
            <p className="header__email">{currentUser.email}</p>
            <button
              className="header__auth-button"
              type="button"
              onClick={onLogout}
            >Выйти
            </button>
          </div>
        )
        : <NavLink to={path} className="nav-link">{title}</NavLink> }
      </div>
    </header>
  );
}

export default Header
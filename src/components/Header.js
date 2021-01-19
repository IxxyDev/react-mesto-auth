import React from 'react';
import logoPath from "../images/logo.svg";
import {Link, useHistory, useLocation} from "react-router-dom";

const Header = ({email, loggedIn, onLogout}) => {
  const location = useLocation()
  const history = useHistory()
  const title = `${location.pathname === "/signup" ? "Войти" : "Регистрация"}`
  const path = `${location.pathname === "/signup" ? "signin" : "signup"}`

  return (
    <header className="header">
      <Link to="/" classname="header__home-link">
        <img className="logo" src={logoPath} alt="Логотип проекта 'Место'"/>
      </Link>
      {loggedIn ? (
          <div className="header__login-container">
            <p className="header__email">{email}</p>
            <button
              className="header__auth-button"
              type="button"
              onClick={onLogout}
            >Выйти
            </button>
          </div>
        )
        : <Link to={path} className="header__link">{title}</Link>}
    </header>
  );
}

export default Header
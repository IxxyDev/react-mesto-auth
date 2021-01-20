import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import '../blocks/auth/auth.css'


const Register = ({handleRegister}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(email, password)
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form" autoComplete="off" noValidate>
          <input onChange={e => setEmail(e.target.value)}
                 name="email"
                 type="email"
                 className="auth__input"
                 required
                 placeholder="Email"
                 defaultValue={email}/>
          <input onChange={e => setPassword(e.target.value)}
                 name="password"
                 type="password"
                 className="auth__input"
                 required
                 placeholder="Пароль"
                 defaultValue={password}/>
          <button type="submit" className="auth__submit">Зарегистрироваться</button>
          <Link to="login" className="auth__link">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}

export default Register
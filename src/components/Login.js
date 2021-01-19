import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import '../blocks/auth/auth.css'


const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin({email, password})
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input onChange={e => setEmail(e.target.value)}
               name="email"
               type="email"
               className="auth__input"
               required
               value={email}
               placeholder="Email"/>
        <input onChange={e => setPassword(e.target.value)}
               name="password"
               type="password"
               className="auth__input"
               required
               placeholder="Пароль"
               value={password}/>
        <div className="auth__button-container">
          <button type="submit" className="auth__submit">Войти</button>
          <Link to="signup" className="auth__link">Не зарегистрированы? Регистрация</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
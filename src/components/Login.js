import React, {useState} from 'react'
import * as auth from '../utils/auth'
import {setToken} from '../utils/token';
import {Link, useHistory} from 'react-router-dom'
import '../blocks/auth/auth.css'


const Login = ({handleLogin}) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const history = useHistory()

  const handleChange = (e) => {
    const {name, value} = e.target
    setData(prevData => ({...prevData, [name]: value}))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = data
    if (!email || !password) return

    auth.authorize(email, password)
      .then(data => {
        if (data.jwt) {
          setToken(data.jwt)
          setData({email: '', password: ''})
          handleLogin(data.user)
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input onChange={handleChange}
               name="email"
               type="email"
               className="auth__input"
               required
               value={data.email}
               placeholder="Email"/>
        <input onChange={handleChange}
               name="password"
               type="password"
               className="auth__input"
               required
               placeholder="Пароль"
               value={data.password}/>
        <div className="auth__button-container">
          <button type="submit" className="auth__submit">Войти</button>
          <Link to="signup" className="auth__link">Не зарегистрированы? Регистрация</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
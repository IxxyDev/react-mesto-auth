import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import * as auth from '../utils/auth'
import {setToken} from "../utils/token";

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
		const { email, password } = data

		if (!email || !password) return

		auth.authorize(email, password)
			.then(data => {
				if (!data) {
					console.error('Error')
				}
				if(data.jwt) {
					setToken(data.jwt)
					setData({email: '', password: ''})
					handleLogin(data.user)
					history.push('/')
				}
			})
			.catch(err => console.error(err))

	}

	return (
		<div onSubmit={handleSubmit} className="login">
			<h2 className="login__heading">Авторизация</h2>
			<form className="login__form">
				<input type="email" className="login__input" placeholder="Email"/>
				<input type="password" className="login__input" placeholder="Пароль"/>
				<button className="login__submit">Войти</button>
			</form>
		</div>
	)
}

export default Login
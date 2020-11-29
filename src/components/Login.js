import React, {useState} from 'react'
import * as auth from '../utils/auth'
import {setToken} from '../utils/token';
import {useHistory} from 'react-router-dom'


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
							 className="login__input"
							 required
							 value={data.email}
							 placeholder="Email"/>
				<input onChange={handleChange}
							 name="password"
							 type="password"
							 className="login__input"
							 required
							 placeholder="Пароль"
							 value={data.password}/>
				<button className="auth__submit">Войти</button>
			</form>
		</div>
	)
}

export default Login
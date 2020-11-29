import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import * as auth from '../utils/auth'


const Register = () => {
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

		auth.register(email, password)
			.then(res => {
			if (res.statusCode !== 400) {
				history.push('/signin')
			}
		})
	}

	return (
		<div className="auth">
			<h2 className="auth__heading">Регистрация</h2>
			<form onSubmit={handleSubmit} className="auth__form">
				<input onChange={handleChange}
							 name="email"
							 type="email"
							 className="auth__input"
							 required
							 placeholder="Email"
							 value={data.email}/>
				<input onChange={handleChange}
							 name="password"
							 type="password"
							 className="auth__input"
							 required
							 placeholder="Пароль"
							 value={data.password}/>
				<button className="auth__submit">Зарегистрироваться</button>
				<Link to="login" className="auth__link">Уже зарегистрированы? Войти</Link>
			</form>
		</div>
	)
}

export default Register
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
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
		if (email && password) {
			auth.register(email, password)
				.then(res => {
					if (res.statusCode !== 400) {
						history.push('/signin')
					} else {
						console.error("Error")
					}
				})
		}
	}

	return (
		<div className="register">
			<h2 className="register__heading">Регистрация</h2>
			<form onSubmit={handleSubmit} className="register__form">
				<input onChange={handleChange}
							 type="email"
							 className="register__input"
							 placeholder="Email"/>
				<input onChange={handleChange}
							 type="password"
							 className="register__input"
							 placeholder="Пароль"/>
				<button className="register__submit">Войти</button>
				<p className="register__undertext">Уже зарегистрированы? Войти</p>
			</form>
		</div>
	)

}

export default Register
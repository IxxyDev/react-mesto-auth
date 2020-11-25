import React, {useState} from 'react'
import {Link} from "react-router-dom";


const Register = ({onRegister}) => {
	const [data, setData] = useState({
		email: '',
		password: ''
	})

	const handleChange = (e) => {
		const {name, value} = e.target
		setData(prevData => ({...prevData, [name]: value}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onRegister(data)
		setData({
			email: '',
			password: ''
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
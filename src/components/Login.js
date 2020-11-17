import React, {useState} from 'react'

const Login = () => {

	const [data, setData] = useState('')

	const handleChange = (e) => {
		const {name, value} = e.target
		setData(prevData => ({...prevData, [name]: value}))
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = data

		if (!email || !password) return

		
	}

	return (
		<div className="login">
			<h2 className="login__heading">Авторизация</h2>
			<form className="login__form">
				<input type="email" className="login__input" placeholder="Email"/>
				<input type="password" className="login__input" placeholder="Пароль"/>
				<button onSubmit={handleSubmit} className="login__submit">Войти</button>
			</form>
		</div>
	)
}

export default Login
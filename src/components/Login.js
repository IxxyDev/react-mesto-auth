import React, {useState} from 'react'


const Login = ({onLogin}) => {
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
		onLogin(data)
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
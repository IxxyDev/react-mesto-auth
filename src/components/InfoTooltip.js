import React, {useState} from 'react'
import '../blocks/popup/popup.css'
import cn from 'classnames'
import okImage from '../images/okImage.svg'
import errorImage from  '../images/errorImage.svg'

const InfoToolTip = () => {
	const success = <><img className="popup__tooltip-image" src={okImage} alt="Галочка успеха"/><span className="popup__tooltip-text">Вы успешно зарегистрировались!</span></>
	const fail = <><img className="popup__tooltip-image" src={errorImage} alt="Крестик неудачи"/><span className="popup__tooltip-text">Что-то пошло не так! Попробуйте еще раз.</span></>


	const [opened, setOpened] = useState(true)

	const handleClose = () => {
		setOpened(false)
	}

	return (
		<section className={cn("popup", opened && "popup_is-opened")}>
			<div className="popup__content popup__content_type_tooltip">
				<button onClick={handleClose} className="popup__close-button" />
				{success}
			</div>
		</section>
		)
}

export default InfoToolTip

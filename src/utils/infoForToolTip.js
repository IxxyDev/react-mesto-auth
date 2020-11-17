import errorImage from '../images/errorImage.svg'
import okImage from '../images/errorImage.svg'

export const infoForTooltip = outcome => {
	switch (outcome) {
		case "error":
			return {
				image: errorImage,
				imageAlt: "Красный крест – ошибка",
				title: "Что-то пошло не так! Попробуйте ещё раз."
			};
		case "login":
			return {
				image: okImage,
				imageAlt: "Галочка успеха",
				title: "Вы успешно авторизовались."
			};
		default:
			return {
				image: okImage,
				imageAlt: "Галочка успеха",
				title: "Вы успешно авторизовались."
			};
	}
}
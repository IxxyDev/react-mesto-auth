import React from "react"
import classnames from 'classnames'
import {infoForTooltip} from "../utils/infoForToolTip";

const InfoTooltip = ({isOpened, onClose, outcome}) => {
	const tooltipClasses = classnames({
		tooltip: true,
		tooltip_disable: !isOpened
	})
	const {image, imageAlt, title} = infoForTooltip(outcome)

	return (
		<section className={tooltipClasses}>
			<div className="tooltip__container">
				<button
					label="Закрыть"
					className="tooltip__button"
					onClick={onClose}
				/>
				<img src={image} alt={imageAlt} className="tooltip_image"/>
				<h2 className="tooltip__title">{title}</h2>
			</div>
		</section>
	)
}

export default InfoTooltip

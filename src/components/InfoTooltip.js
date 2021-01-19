import React, {useState} from 'react'
import '../blocks/popup/popup.css'
import PopupWithForm from "./PopupWithForm";

const InfoToolTip = ({image, isOpened, onClose, message}) => {
 return (
   <PopupWithForm
     name="tooltip"
     isOpened={isOpened}
     onClose={onClose}
   >
     <div className={`popup__icon-${image}`} />
     <p className="popup__tooltip-text">{message}</p>
   </PopupWithForm>
 )
}

export default InfoToolTip

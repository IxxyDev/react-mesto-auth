import React from 'react'

const ErrorMessage = ({isActive, errorText, additionalClasses = ''}) => {

  return <span
    className={`form__input-error ${isActive || 'form__input-error_active'} ${additionalClasses}`}
  >
      {errorText}
    </span>
}

export default ErrorMessage
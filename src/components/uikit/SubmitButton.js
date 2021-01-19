import React from 'react'
import classnames from 'classnames'

const SubmitButton = ({isActive, buttonClick, additionalClasses, buttonText = ''}) => {
  const classes = classnames({
    button: true,
    button_type_submit: true,
    'popup__button': true,
    'popup__button_disabled': !isActive,
    [additionalClasses]: additionalClasses,
  })

  return <button
    type='submit'
    onClick={buttonClick}
    className={classes}
  >
    {buttonText}
  </button>
}

export default SubmitButton
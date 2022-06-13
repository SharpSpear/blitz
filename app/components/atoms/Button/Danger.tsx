import React from "react"

import styles from "./Button.module.scss"

const ButtonDanger = (props) => {
  const buttonProps = { ...props }

  buttonProps.className =
    styles.button +
    " text-white font-medium bg-red-600 px-8 py-2 hover:bg-opacity-80 border hover:border-primary hover:text-white "

  if (props.className) {
    buttonProps.className += props.className
  }
  return (
    <>
      <button {...buttonProps}>{props.children}</button>
    </>
  )
}

export default ButtonDanger

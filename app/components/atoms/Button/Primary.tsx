import React from "react"

import styles from "./Button.module.scss"

const ButtonPrimary = (props) => {
  const buttonProps = { ...props }

  buttonProps.className =
    styles.button +
    " disabled:opacity-50 text-white font-medium bg-[#1BBD90] px-8 py-2 hover:bg-opacity-80 border hover:border-[#1BBD90] hover:text-white "

  if (props.className) {
    buttonProps.className += props.className
  }
  return (
    <>
      <button {...buttonProps}>{props.children}</button>
    </>
  )
}

export default ButtonPrimary

import React from "react"
import styles from "./Button.module.scss"

const ButtonOutlined = (props) => {
  const buttonProps = { ...props }
  buttonProps.className =
    styles.button +
    " bg-transparent font-medium	hover:bg-[#1BBD90] hover:bg-opacity-50 text-primary hover:text-white px-8 py-2 border border-[#1BBD90] hover:border-transparent "

  if (props.className) {
    buttonProps.className += props.className
  }
  return (
    <>
      <button {...buttonProps}>{props.children}</button>
    </>
  )
}

export default ButtonOutlined

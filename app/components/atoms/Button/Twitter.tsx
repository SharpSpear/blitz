import React from "react"
import ButtonOutlined from "./Outlined"
import { Image } from "blitz"

const ButtonTwitter = ({ className = "", children, ...props }) => {
  const TwitterIcon = "/svg-icons/social/twitter.svg"

  const buttonProps = { ...props }
  className += " text-red hover:fill-current hover:text-black"
  return (
    <ButtonOutlined className="content-center">
      <Image
        src={TwitterIcon}
        alt="Signup with Twitter"
        width={30}
        height={30}
        className={className}
        {...buttonProps}
      />
      <div className="mx-5">{children}</div>
    </ButtonOutlined>
  )
}

export default ButtonTwitter

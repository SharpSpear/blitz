import Image from "next/image"
import React from "react"

export type IindexProps = {
  text
  icon?
}

const Nav: React.FC<IindexProps> = ({ text, icon }) => {
  return (
    <>
      <a href="/" className="flex">
        {icon && (
          <i className=" mr-2">
            <Image src={icon} alt="Icon" width="18px" height="18px" />
          </i>
        )}
        <h1 className="text-xs lg:w-32 font-Montserrat text-black">{text}</h1>
      </a>
    </>
  )
}

export { Nav }

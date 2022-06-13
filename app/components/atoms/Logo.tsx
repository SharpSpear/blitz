/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react"
import { Link, Routes } from "blitz"

const Logo = (props) => {
  return (
    <Link href={Routes.Home()}>
      <a className="flex">
        <img className={`${props.className} z-10 ` || ""} src="/logo.svg" width="138" height="50" />
      </a>
    </Link>
  )
}

export default Logo

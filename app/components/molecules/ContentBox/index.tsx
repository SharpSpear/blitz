/* eslint-disable jsx-a11y/alt-text */
import React, { ReactNode } from "react"

import { Image } from "blitz"

import styles from "./styles.module.scss"

interface IProps {
  children: ReactNode | string
  className?: string
}

const ContentBox = ({ children, ...props }: IProps) => {
  return (
    <div className={styles.contentBox + " " + props.className}>
      <div className={"rounded-lg w-full overflow-hidden"}>
        <div className="flex justify-items-center w-full">
          <div className="w-full flex items-center content-center">
            <div className="w-full px-10 py-10 ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentBox

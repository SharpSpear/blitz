/* eslint-disable jsx-a11y/alt-text */
import React, { ReactNode } from "react"

import { Image } from "blitz"

import styles from "./ContentBoxWithCover.module.scss"

interface IProps {
  coverImage: { src: string; alt: string }
  children: ReactNode | string
}

const ContentBoxWithCover = ({ coverImage, children }: IProps) => {
  return (
    <div className={styles.contentBox + " bg-white "}>
      <div className={"rounded-lg w-full overflow-hidden"}>
        <div className="flex justify-items-center w-full">
          <div className="hidden md:block w-1/2 py-10 px-10 bg-active">
            <div className="h-full flex items-center justify-center">
              <div className="">
                <Image
                  className="object-contain"
                  src={coverImage.src as any}
                  alt={coverImage.alt}
                  layout="fixed"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
            <div className="w-full px-10 py-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentBoxWithCover

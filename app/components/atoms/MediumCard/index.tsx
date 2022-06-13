import Image from "next/image"
import React from "react"
import styles from "./medium.card.module.scss"
export type IMediumCardProps = {
  image: any
  title: string
  name: string
  changes: Number
  className?: string
}

const MediumCard: React.FC<IMediumCardProps> = ({
  image,
  title,
  name,
  changes,
  className = "",
}) => {
  return (
    <div className={`${styles.mediumCard} flex md:flex-col p-3 ${className}`}>
      <Image src={image} alt="Card Image" width="150px" height="250px" />
      <div className="flex-col">
        <div className="flex md:justify-between md:pt-5 w-full pl-3 ">
          <h1 className="font-Montserrat font-semibold  text-lg ">{title}</h1>
          <i className="flex flex-col space-y-1 ml-20 lg:ml-5">
            <div className="w-1 h-1 rounded bg-gray-400 "></div>
            <div className="w-1 h-1 rounded bg-gray-400"></div>
            <div className="w-1 h-1 rounded bg-gray-400"></div>
          </i>
        </div>
        <p className="pl-3 font-Montserrat text-xs  flex flex-col   md:flex-row space-x-2 -ml-2 space-y-4 md:items-baseline">
          {" "}
          <span className="ml-2 ">{name}</span> <span className="hidden md:block "> . </span>{" "}
          <span>{`${changes} records`}</span>
        </p>
      </div>
    </div>
  )
}

export { MediumCard }

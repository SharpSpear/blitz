import React, { useState } from "react"
import styles from "./RecordCard.module.scss"
import Image from "next/image"
import { Link, Routes } from "blitz"
import { EditIcon, DeleteIcon, BlueDeleteIcon } from "app/assets"
import { Record, ChangeType } from "db"
import moment from "moment"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import { rgbDataURL } from "app/core/utils/misc"
import ModalDialog from "app/components/molecules/ModalDialog"

interface ChangeCardProps {
  change: Record
  left?: boolean
  right?: boolean
  showPrivateDesc?: boolean
  isOwner?: boolean
  handleDeleteChange?: (changeId) => void
}

const ChangeCard = ({
  handleDeleteChange,
  change,
  left,
  right,
  showPrivateDesc,
  isOwner = false,
}: ChangeCardProps) => {
  let typeOfChange: string

  switch (change.type) {
    case ChangeType.PROJECT:
      typeOfChange = "Project"
      break
    case ChangeType.TRACKRECORD:
      typeOfChange = "Track Record"
      break
    case ChangeType.NEWS:
      typeOfChange = "News"
      break
    case ChangeType.EDUCATION:
      typeOfChange = "Education"
      break
    case ChangeType.PERSONAL:
      typeOfChange = "Personal"
      break
  }

  const [showDeleteChange, setShowDeleteChange] = useState(false)

  const renderActionMenu = ({ direction }) => {
    return (
      <div className="flex justify-center align-center pl-3">
        <DropdownRender theme="white" direction={direction}>
          <DropdownItem
            href={Routes.EditChangePage({ recordId: change.id })}
            className="text-black flex gap-x-3"
          >
            <Image src={EditIcon} width="15" height="15" alt="edit" />
            <span>Edit record</span>
          </DropdownItem>
          <DropdownItem
            onClick={() => setShowDeleteChange(true)}
            className="text-black flex gap-x-3"
          >
            <Image src={DeleteIcon} width="15" height="15" alt="delete" />
            <span>Delete record</span>
          </DropdownItem>
        </DropdownRender>
      </div>
    )
  }

  return (
    <div key={change.id}>
      {/**
       * This is for the desktop version
       */}
      <div className={`hidden xl:flex`}>
        {right && <div className={`${styles.arrow} rotate-180`}></div>}
        <div className="bg-white rounded-sm p-5 flex flex-col shadow-lg z-10 max-w-[480px] min-w-[320px]">
          <div className="flex justify-between items-center">
            <p className="font-Montserrat text-lg  font-semibold text-black">{typeOfChange}</p>
            <div className="flex text-gray-400 font-normal text-xs items-center space-x-4 ">
              <p>{moment(change.createdAt).format("ll")}</p>
              {isOwner && renderActionMenu({ direction: "horizontal" })}
            </div>
          </div>
          <div className="mt-8">
            <p className=" font-Montserrat text-sm leading-7  font-normal text-black break-all">
              {showPrivateDesc && change.privateDesc ? change.privateDesc : change.publicDesc}
            </p>
          </div>
          {change.imageUrl && (
            <div className="w-full drop-shadow-xl mt-5">
              <Image
                alt={change.imageUrl}
                src={change.imageUrl}
                objectFit="cover"
                width="280"
                height="100%"
                layout="responsive"
                objectPosition="center center"
                priority
                placeholder="blur"
                blurDataURL={rgbDataURL()}
              />
            </div>
          )}
        </div>
        {left && <div className={styles.arrow}></div>}
      </div>

      {/**
       * This is for the mobile version
       */}
      <div className={`flex xl:hidden w-full`}>
        {right && <div className={`${styles.arrow} rotate-180`}></div>}
        <div className="bg-white rounded-sm px-4 py-5 flex flex-col shadow-lg z-10 w-full">
          <div className="flex justify-between items-center">
            <p className="font-Montserrat text-sm  font-semibold text-black">{typeOfChange}</p>
            <div className="flex items-center space-x-4 ">
              <p className="text-xs font-light text-gray-400">
                {moment(change.createdAt).format("ll")}
              </p>
              {isOwner && renderActionMenu({ direction: "vertical" })}
            </div>
          </div>
          <div className="mt-8">
            <p className=" font-Montserrat text-sm leading-7  font-normal text-black break-all">
              {showPrivateDesc && change.privateDesc ? change.privateDesc : change.publicDesc}
            </p>
          </div>
          {change.imageUrl && (
            <div className="w-full mt-5 drop-shadow-xl">
              <Image
                alt={change.imageUrl}
                src={change.imageUrl}
                objectFit="cover"
                width="280"
                height="100%"
                layout="responsive"
                objectPosition="center center"
                priority
                placeholder="blur"
                blurDataURL={rgbDataURL()}
              />
            </div>
          )}
        </div>
      </div>

      <ModalDialog open={showDeleteChange} onClose={() => setShowDeleteChange(false)}>
        <div className="flex font-Montserrat justify-center">
          <div
            className="bg-white flex flex-col justify-between shadow-lg text-center p-8"
            style={{
              height: "346px",
              width: "451px",
            }}
          >
            <Image height="51" width="53" alt="delete-icon" src={BlueDeleteIcon} />
            <h5 className="text-2xl  font-bold">Delete this prospect?</h5>
            <p>The project will be deleted permanently. Are you sure you want to proceed?</p>
            <div className="flex justify-between">
              <button
                className="bg-[#1BBD90] cursor-pointer px-8 p-2 text-white"
                onClick={() => {
                  handleDeleteChange?.(change.id)
                  setShowDeleteChange(false)
                }}
              >
                Yes, delete
              </button>
              <button
                className="border-[#1BBD90]  border cursor-pointer px-8 p-2"
                onClick={() => setShowDeleteChange(false)}
                style={{ color: "#1BBD90" }}
              >
                No, keep
              </button>
            </div>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}

export default ChangeCard

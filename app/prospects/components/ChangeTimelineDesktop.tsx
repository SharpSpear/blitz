import React from "react"
import { Link, Routes } from "blitz"
import styles from "../pages/prospects/Prospect.module.scss"
import ProjectChangeCard from "app/components/atoms/ProjectChangeCard"
import HorizontalProgressBar from "app/components/molecules/HorizontalProgressBar/HorizontalProgressBar"
import { isEmpty } from "lodash"
import moment from "moment"
// import VideoPlayer from "react-simple-video-player"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import dynamic from "next/dynamic"
import ModalDialog from "app/components/molecules/ModalDialog"

const VideoPlayer = dynamic<any>(() => import("react-simple-video-player"), {
  ssr: false,
})

import {
  ProjectIcon,
  TrackRecordIcon,
  NewsIcon,
  EducationIcon,
  PersonalIcon,
  HammerIcon,
} from "app/assets"
import { ChangeType } from "db"
import Image from "next/image"
import { EditIcon, DeleteIcon, BlueDeleteIcon } from "app/assets"
import ReadMore from "app/components/atoms/ReadMore"

interface ChangeTimelineProps {
  changes: any
  projectId: number
  isOwner?: boolean
  handleDeleteChange?: (changeId: any) => any | void
  viewAsOwner?: boolean
  plan: string
}
const ProjectRecordCard = (props: {
  text: any
  date: any
  image?: string
  id: number
  isOwner: boolean
  handleDeleteChange?: (changeId: any) => any | void
  plan: string
}) => {
  const [showDeleteChange, setShowDeleteChange] = React.useState(false)
  return (
    <div className="rounded-lg shadow-lg break-all bg-white overflow-hidden">
      {props.plan !== "FREE" && (
        <>
          <div className="flex justify-between items-center p-1">
            {/* <p className="font-Montserrat text-lg  font-semibold text-black">{typeOfChange}</p> */}
            {/* <p>{moment(props.date).format("ll")}</p> */}
            {props.isOwner && (
              <div className="flex justify-center align-center pl-3 ml-auto">
                <DropdownRender theme="white" direction={"vertical"}>
                  <DropdownItem
                    href={Routes.EditChangePage({ recordId: props.id })}
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
            )}
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
                      props.handleDeleteChange?.(props.id)
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
        </>
      )}

      {props.image && (
        <>
          {(props.image as any).match(
            /.(jpg|tif|pjp|xbm|jxl|svgz|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)$/i
          ) ? (
            <div className="flex justify-center">
              <img src={props.image} alt="record image" loading="lazy" />
            </div>
          ) : (
            <div className="flex justify-center video-wrapper">
              <VideoPlayer url={props.image} width={"100%"} height={"auto"} loop />

              {/* This is video */}
            </div>
          )}
        </>
      )}
      <div className="p-4">
        <ReadMore>{props.text}</ReadMore>
        <div className="flex mt-2">
          <div className="ml-auto">
            <p className="font-Opensans-Light">{moment(props.date).format("ll")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const getChangeTypeIcon = (typeOfChange) => {
  switch (typeOfChange) {
    case ChangeType.PROJECT:
      return ProjectIcon
    case ChangeType.TRACKRECORD:
      return TrackRecordIcon
    case ChangeType.NEWS:
      return NewsIcon
    case ChangeType.EDUCATION:
      return EducationIcon
    case ChangeType.PERSONAL:
      return PersonalIcon
    default:
      return TrackRecordIcon
  }
}
const ChangeTimelineDesktop = ({
  changes,
  projectId,
  isOwner,
  handleDeleteChange,
  viewAsOwner,
  plan,
}: ChangeTimelineProps) => {
  const refContainer = React.useRef()

  const getPublicChanges = (changesArr) => {
    changesArr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return changesArr.filter((change) => change.isPublic)
  }

  const renderChanges = (changesArr) => {
    const content = (
      <div className="flex items-end p-4 min-h-[300px]" ref={refContainer.current}>
        {changesArr.map((change, i) => (
          <div key={i} className="w-[350px]">
            {i % 2 === 1 ? (
              // <ProjectChangeCard
              //   handleDeleteChange={handleDeleteChange}
              //   isOwner={isOwner}
              //   showPrivateDesc={viewAsOwner}
              //   left
              //   change={change}
              // />
              <div className="w-[350px]">
                <ProjectRecordCard
                  date={change.date}
                  text={change.publicDesc}
                  image={change.imageUrl}
                  id={change.id}
                  isOwner={isOwner ?? false}
                  handleDeleteChange={handleDeleteChange}
                  plan={plan}
                />
              </div>
            ) : (
              <div className="w-[350px]"></div>
            )}
          </div>
        ))}
      </div>
    )
    const content1 = (
      <div className="flex flex-row">
        {changesArr.map((change, i) => (
          <div
            key={i}
            className="flex"
            style={{
              width: "350px",
              height: "0px",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
            <div className="w-[150px] my-border " />
            <div className={i % 2 === 1 ? "my-border1" : "my-border2"}>
              <div
                className="absolute"
                style={{ left: "8px", [i % 2 === 1 ? "top" : "bottom"]: "8px", height: "30px" }}
              >
                <Image
                  // src={HammerIcon}
                  src={getChangeTypeIcon(change.type)}
                  alt="change-type-icon"
                  layout="fixed"
                  width="30"
                  height="30"
                />
              </div>
            </div>
            <div className="w-[150px] my-border" />
          </div>
        ))}
      </div>
    )
    const content2 = (
      <div className="flex items-start">
        {changesArr.map((change, i) => (
          <div key={i} className="w-[350px]">
            {i % 2 === 0 ? (
              // <ProjectChangeCard
              //   handleDeleteChange={handleDeleteChange}
              //   isOwner={isOwner}
              //   showPrivateDesc={viewAsOwner}
              //   left
              //   change={change}
              // />
              <div className="w-[350px]">
                <ProjectRecordCard
                  date={change.date}
                  text={change.publicDesc}
                  image={change.imageUrl}
                  isOwner={isOwner ?? false}
                  id={change.id}
                  handleDeleteChange={handleDeleteChange}
                  plan={plan}
                />
              </div>
            ) : (
              <div className="w-[350px]"></div>
            )}
          </div>
        ))}
      </div>
    )

    return (
      <div className="mb-4">
        {content}
        {content1}
        {content2}
      </div>
    )
  }

  return (
    <div className=" overflow-auto ">
      {isEmpty(changes) && (
        <h1 className="text-center text-gray-500 font-Montserrat font-semibold text-4xl">
          No Records Yet
        </h1>
      )}
      {viewAsOwner ? renderChanges(changes) : renderChanges(getPublicChanges(changes))}
    </div>
  )
}

export default ChangeTimelineDesktop

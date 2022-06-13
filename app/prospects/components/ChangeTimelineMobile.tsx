import React from "react"
import { Link, Routes } from "blitz"
import styles from "../pages/prospects/Prospect.module.scss"
import ProjectChangeCard from "app/components/atoms/ProjectChangeCard"
import VerticalProgressBar from "app/components/molecules/VerticalProgressBar/VerticalProgressBar"
import { isEmpty } from "lodash"
import moment from "moment"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import dynamic from "next/dynamic"
import ModalDialog from "app/components/molecules/ModalDialog"

import Image from "next/image"
import { EditIcon, DeleteIcon, BlueDeleteIcon } from "app/assets"
const VideoPlayer = dynamic<any>(() => import("react-simple-video-player"), {
  ssr: false,
})
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
            <div className="flex justify-center">
              {typeof window !== undefined && (
                <VideoPlayer url={props.image} width={"100%"} height={"auto"} loop />
              )}
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
const ChangeTimelineMobile = ({
  changes,
  projectId,
  isOwner,
  handleDeleteChange,
  viewAsOwner,
  plan,
}: ChangeTimelineProps) => {
  const getPublicChanges = (changesArr) => {
    changesArr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return changesArr.filter((change) => change.isPublic)
  }

  const renderChanges = (changesArr) => {
    return (
      <div>
        {changesArr.map((change, i) => {
          return (
            <div key={i} className={`grid grid-cols-5 gap-1`}>
              <div className="flex justify-center">
                <VerticalProgressBar typeOfChange={change.type} />
              </div>
              <div className="mt-12 flex col-start-2 col-end-6 z-10 pl-5">
                <ProjectRecordCard
                  date={change.date}
                  text={change.publicDesc}
                  image={change.imageUrl}
                  id={change.id}
                  isOwner={isOwner ?? false}
                  handleDeleteChange={handleDeleteChange}
                  plan={plan}
                />
                {/* <ProjectChangeCard
                  handleDeleteChange={handleDeleteChange}
                  isOwner={isOwner}
                  showPrivateDesc={viewAsOwner}
                  right
                  change={change}
                /> */}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="container mx-auto ">
      {isEmpty(changes) && (
        <h1 className="text-center text-gray-500 font-Montserrat font-semibold text-4xl">
          No Records Yet
        </h1>
      )}

      {viewAsOwner ? renderChanges(changes) : renderChanges(getPublicChanges(changes))}
    </div>
  )
}

export default ChangeTimelineMobile

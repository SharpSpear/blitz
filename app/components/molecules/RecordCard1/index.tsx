import React, { ReactNode, useState } from "react"
import { Link, Routes, Image } from "blitz"
import { Record, Prospect, ChangeType } from "db"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import ProjectImage from "app/components/molecules/ProjectImage"
import { CarbonViewIcon, LinkIcon } from "app/assets"
import moment from "moment"
import { rgbDataURL } from "app/core/utils/misc"
import toast from "react-hot-toast"

import { ProjectIcon, NewsIcon, TrackRecordIcon, EducationIcon, PersonalIcon } from "app/assets"
import ReadMore from "app/components/atoms/ReadMore"

import dynamic from "next/dynamic"

const VideoPlayer = dynamic<any>(() => import("react-simple-video-player"), {
  ssr: false,
})

const getColor = (type) => {
  switch (type) {
    case ChangeType.PROJECT:
      return "#4579FF"
    case ChangeType.NEWS:
      return "#DBD31B"
    case ChangeType.TRACKRECORD:
      return "#18BD3D"
    case ChangeType.EDUCATION:
      return "#1FC6BC"
    case ChangeType.PERSONAL:
      return "#FA3867"
    default:
      return "#18BD3D"
  }
}

export const RecordCardBody = ({ change }) => {
  let imageUrls = change.images ?? [change.imageUrl]

  return (
    <div>
      <div className="py-5 font-normal text-left break-all " style={{ width: "100%" }}>
        <ReadMore>{change.publicDesc}</ReadMore>
      </div>
    </div>
  )
}

const RecordCard = ({
  change,
  children,
}: {
  change: Omit<Record, "privateDesc"> & { prospect: Prospect }
  children: ReactNode
}) => {
  let typeColor = getColor(change.type)
  return (
    <article
      key={Math.random()}
      id={"changeCard-" + change.id}
      className={"overflow-hidden rounded-lg shadow-lg border bg-white w-[300px] lg:w-[800px] mb-4"}
    >
      <header className="flex items-center justify-between leading-tight px-5 py-4">
        <div className="relative h-8 w-8 sm:block">
          <ProjectImage
            alt="Placeholder"
            className="rounded-full"
            project={change.prospect}
            width={32}
            height={32}
            fallBackClass="block rounded-full"
            fallBackHeight={"32px"}
            fallBackWidth={"32px"}
            textSize=""
          />
        </div>
        <Link href={Routes.ShowProjectPage({ slug: change.prospect.slug })} passHref>
          <p className="font-semibold cursor-pointer m-0 sm:ml-3 text-sm sm:text-lg sm:mr-2">
            {change.prospect.name}
          </p>
        </Link>
        {/* <div className="h-6 w-6 relative ml-4">
            <Image src={typeIcon} alt="" width="100%" height="100%" layout="responsive" priority />
          </div> */}
        <p className="text-grey-darker ml-auto text-sm">{moment(change.date).format("ll")}</p>
        <div className="ml-auto">
          <DropdownRender className="transform rotate-90" direction={"horizontal"} theme="white">
            <DropdownItem
              href={Routes.ShowProjectPage({ slug: change.prospect.slug })}
              className="text-black flex gap-x-3"
            >
              <Image src={CarbonViewIcon} width="15" height="15" alt="edit" />
              <span>View Prospect</span>
            </DropdownItem>
            {/* <DropdownItem
              onClick={() => {
                navigator.clipboard.writeText(window.location.host + "/changes/" + change.id)
                toast.success("Copied to clipboard!")
              }}
              className="text-black flex gap-x-3"
            >
              <Image src={LinkIcon} width="15" height="15" alt="link" />
              <span>Copy link to record</span>
            </DropdownItem> */}
          </DropdownRender>
        </div>
      </header>
      <div className="flex justify-center">
        {change.imageUrl && (
          <div className=" w-[100%]">
            {(change.imageUrl as any).match(
              /.(jpg|tif|pjp|xbm|jxl|svgz|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)$/i
            ) ? (
              <div className="flex justify-center">
                <img
                  src={change.imageUrl}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex justify-center video-wrapper">
                <VideoPlayer url={change.imageUrl} height={"auto"} loop />

                {/* This is video */}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-5 flex">{children}</div>
      <div
        className="flex items-center no-underline hover:no-underline text-black px-5 h-[45px] justify-center"
        style={{ backgroundColor: typeColor }}
      >
        {change.type}
      </div>
    </article>
  )
}

export default RecordCard

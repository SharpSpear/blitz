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

const getIcon = (type) => {
  switch (type) {
    case ChangeType.PROJECT:
      return ProjectIcon
    case ChangeType.NEWS:
      return NewsIcon
    case ChangeType.TRACKRECORD:
      return TrackRecordIcon
    case ChangeType.EDUCATION:
      return EducationIcon
    case ChangeType.PERSONAL:
      return PersonalIcon
    default:
      return TrackRecordIcon
  }
}

export const ChangeCardBody = ({ change }) => {
  let imageUrls = change.images ?? [change.imageUrl]

  // NOTE: we can implement this later when Changes can accept multiple images
  // if (imageUrls?.length < 3) {
  //   for (let i = 0; i < 3 - imageUrls.length; i++) {
  //     /**
  //      * add transparent image to serve as placeholder for better html rendering
  //      */
  //     imageUrls.push("/transparent.png")
  //   }
  // }

  // imageUrls?.forEach((image) => {
  //   images.push(
  //     <a href="#" key={Math.random() + change.id}>
  //       <img alt="Placeholder" className="block" src={image} width={170} height={114} />
  //     </a>
  //   )
  // })

  return (
    <div>
      <div className="py-5 font-normal text-left break-all " style={{ width: "100%" }}>
        {change.publicDesc}
      </div>
      {/* <div className="flex">
        {imageUrls.map((imageUrl, i) => {
          return (
            imageUrl && (
              <div key={i} className="w-full">
                <Image
                  alt={imageUrl}
                  src={imageUrl}
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
            )
          )
        })}
      </div> */}
    </div>
  )
}

const ChangeCard = ({
  change,
  children,
}: {
  change: Omit<Record, "privateDesc"> & { prospect: Prospect }
  children: ReactNode
}) => {
  let typeIcon = getIcon(change.type)
  return (
    <article
      key={Math.random()}
      id={"changeCard-" + change.id}
      className={"overflow-hidden rounded-lg shadow-lg border bg-white "}
    >
      <header className="flex items-center justify-between leading-tight pr-3 pt-2">
        <div className="ml-auto">
          <DropdownRender className="transform rotate-90" direction={"horizontal"} theme="white">
            {/* <Link } passHref> */}
            <DropdownItem
              href={Routes.ShowProjectPage({ slug: change.prospect.slug })}
              className="text-black flex gap-x-3"
            >
              <Image src={CarbonViewIcon} width="15" height="15" alt="edit" />
              <span>View Prospect</span>
            </DropdownItem>
            {/* </Link> */}
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
      <div className="p-5">{children}</div>
      <div
        className="flex items-center no-underline hover:no-underline text-black px-5 h-[45px]"
        style={{ backgroundColor: "#1BBD90B2" }}
      >
        <div className="relative h-8 w-8 hidden sm:block">
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
      </div>
    </article>
  )
}

export default ChangeCard
// if (change.type === "major-milestone") {
//   typeIcon = MajorMilestoneIcon
// } else if (change.type === "news") {
//   typeIcon = NewsIcon
//
//   content = (
//     <div>
//       <p className="py-5 font-normal">
//         Timmy is starting a company. He wants to document the journey. If it’s easy enough, he
//         will add updates regularly. He wants to keep some updates totally private. Some updates,
//         he wants to be able to share with the public, but he wants to redact (hide) certain
//         details.
//       </p>
//     </div>
//   )
// }

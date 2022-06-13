import React, { useState, useEffect } from "react"
import { Routes, Link } from "blitz"
import Image from "next/image"
import { Prospect, User } from "db"
import { WebsiteIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "app/assets"
import moment from "moment"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import {
  EditIcon,
  DeleteIcon,
  //ProspectBack,
  //InstaBack,
  //FBBack,
  //TwtBack
} from "app/assets"
import { BlueDeleteIcon } from "app/assets"
import { getFullName } from "app/core/utils/user"
import { rgbDataURL } from "app/core/utils/misc"
import ModalDialog from "app/components/molecules/ModalDialog"
import dynamic from "next/dynamic"

const VideoPlayer = dynamic<any>(() => import("react-simple-video-player"), {
  ssr: false,
})

interface ProjectCardProps {
  project: Prospect & { owner: { firstName: string; lastName: string } | null }
  numberOfChanges?: number
  isOwner?: boolean
  handleDeleteProject?: () => {} | void
  handleVote?: () => {} | void
}

const ProjectCard = ({
  project: {
    name: projectName,
    url,
    partyId,
    createdAt,
    instagramHandle,
    facebookHandle,
    linkedinHandle,
    twitterHandle,
    owner,
    slug,
    imageUrl,
    votable,
    votes,
    isPublic,
  },
  numberOfChanges,
  isOwner,
  handleDeleteProject,
  handleVote,
}: ProjectCardProps) => {
  const [showDeleteProject, setShowDeleteProject] = useState(false)

  const renderSocialMediaLinks = ({ lg }) => {
    const socialMediaLinks = [
      {
        url: "https://www.facebook.com/",
        handle: facebookHandle,
        icon: FacebookIcon,
      },
      {
        url: "https://www.instagram.com/",
        handle: instagramHandle,
        icon: InstagramIcon,
      },
      {
        url: "https://www.twitter.com/",
        handle: twitterHandle,
        icon: TwitterIcon,
      },
    ]

    return socialMediaLinks.map((link, i) => {
      if (link.handle) {
        return (
          <Link key={i} href={`${link.url}${link.handle}`}>
            <a className="px-1 flex align-end" target="_blank">
              <Image
                src={link.icon}
                alt="fb-icon"
                layout="fixed"
                height={lg ? "28" : "20"}
                width={lg ? "28" : "20"}
              />
            </a>
          </Link>
        )
      }
    })
  }

  const renderActionMenu = ({ direction }) => {
    return (
      <div className="flex justify-center align-center pl-3">
        <DropdownRender theme="white" direction={direction}>
          <DropdownItem href={Routes.EditProjectPage({ slug })} className="text-black flex gap-x-3">
            <Image src={EditIcon} width="15" height="15" alt="edit" />
            <span>Edit prospect</span>
          </DropdownItem>
          <DropdownItem
            onClick={() => setShowDeleteProject(true)}
            className="text-black flex gap-x-3"
          >
            <Image src={DeleteIcon} width="15" height="15" alt="delete" />
            <span>Delete prospect</span>
          </DropdownItem>
        </DropdownRender>
      </div>
    )
  }

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg mx-auto max-w-[254px] overflow-hidden`}>
        <div className="flex flex-col  items-center">
          {/*<Image src={ProspectBack} alt="Card back" width={254} height={114} />*/}
          <div
            className="w-[100px] h-[100px] overflow-hidden z-20"
            style={{ marginTop: "-50px", borderRadius: "50px" }}
          >
            {imageUrl ? (
              <>
                {(imageUrl as any).match(
                  /.(jpg|tif|pjp|xbm|jxl|svgz|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)$/i
                ) ? (
                  <Image
                    src={imageUrl}
                    alt={projectName}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectPosition="center center"
                    priority
                    placeholder="blur"
                    blurDataURL={rgbDataURL()}
                  />
                ) : (
                  <VideoPlayer url={imageUrl} width={"100%"} height={"auto"} autoplay loop />
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                <p className="text-5xl text-gray-400">{projectName.charAt(0)}</p>
              </div>
            )}
          </div>
          <div className="mt-[15px]">
            <p className="font-Raleway-Bold text-[18px]">{projectName}</p>
          </div>
          <div className="mt-[7px]">
            <p
              className="font-Raleway-Bold text-[10px] text-center leading-[16px]"
              style={{ color: "#7A7A7A" }}
            >
              {projectName}
            </p>
          </div>
          <div className="flex w-[50%] justify-between py-2">
            <Link href="#">
              {/*<Image src={FBBack} alt="facebook image" width={25} height={25} />*/}
            </Link>
            <Link href="#">
              {/*<Image src={TwtBack} alt="twitter image" width={25} height={25} />*/}
            </Link>
            <Link href="#">
              {/*<Image src={InstaBack} alt="instagram image" width={25} height={25} />*/}
            </Link>
          </div>
          <div className="flex w-full mt-[16px] px-3">
            <p
              style={{ color: "#7A7A7A" }}
              className="font-Opensans text-[10px]"
            >{`${numberOfChanges} Records`}</p>
            <p
              style={{ color: "#7A7A7A" }}
              className="font-Opensans text-[10px] ml-auto"
            >{`Created at ${moment(createdAt).format("ll")}`}</p>
          </div>
        </div>

        {/**
         * NOTE: This component assumes Mobile First
         * This is for mobile view
         * This section is hidden on lg screens and up
         */}
        {/* <div className="lg:hidden px-3 pt-4 pb-5">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={projectName}
                objectFit="cover"
                width="100%"
                height="100%"
                layout="responsive"
                objectPosition="center center"
                priority
                placeholder="blur"
                blurDataURL={rgbDataURL()}
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                <p className="text-5xl text-gray-400">{projectName.charAt(0)}</p>
              </div>
            )}
          </div>
          <div className="col-start-2 col-end-4 flex justify-between">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="font-Montserrat font-semibold text-xl mb-2">{projectName}</h1>
                {getFullName(owner) ? (
                  <p className="text-gray-400 font-light text-sm mb-1">
                    {getFullName(owner)} &bull; {numberOfChanges} Records
                  </p>
                ) : (
                  <p className="text-gray-400 font-light text-sm mb-1">{numberOfChanges} Records</p>
                )}
              </div>
              <p className="text-gray-400 font-light text-xs">
                <span className="hidden xl:inline">Created at</span>{" "}
                {moment(createdAt).format("ll")}
              </p>
            </div>
            <div className="mt-1">{isOwner && renderActionMenu({ direction: "vertical" })}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center">
          {url && (
            <div className="cols-span-2 flex justify-between">
              <Link href={url}>
                <a className="flex items-center" target="_blank">
                  <div className="mr-1 flex">
                    <Image src={WebsiteIcon} alt="fb-icon" layout="fixed" height="20" width="20" />
                  </div>
                  <span className="font-Montserrat font-light text-sm">{url}</span>
                </a>
              </Link>
            </div>
          )}
          <div className="col-start-3 flex justify-end items-center">
            {renderSocialMediaLinks({ lg: false })}
          </div>
        </div>
      </div>*/}

        {/**
         * This is for desktop view
         * This section shows up on lg screen and up
         */}
        {/* <div className="flex flex-col justify-center items-center rounded-lg">
          <div className="w-full bg-gray-300 rounded-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={projectName}
                objectFit="cover"
                width="100%"
                height="100%"
                layout="responsive"
                objectPosition="center center"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-300 flex justify-center items-center rounded-lg">
                <p className="text-5xl text-gray-400">{projectName.charAt(0)}</p>
              </div>
            )}
          </div>
          <div className="col-start-2 col-end-4 flex flex-col">
            <div className="flex-grow flex justify-between mt-2">
              <div>
                <h1 className="font-Montserrat font-semibold text-2xl mb-2">{projectName}</h1>
                {getFullName(owner) ? (
                  <p className="text-gray-400 font-light text-sm mb-1">
                    {getFullName(owner)} &bull; {numberOfChanges} Records
                  </p>
                ) : (
                  <p className="text-gray-400 font-light text-sm mb-1">{numberOfChanges} Records</p>
                )}
                {party ? (
                  <div className="">
                    <p className="text-gray-400 font-light text-sm mb-1">{party}</p>
                  </div>
                ) : null}
              </div>
              <div className="flex">
                <p className="text-gray-400 font-light text-xs">
                  <span className="hidden xl:inline">Created at</span>{" "}
                  {moment(createdAt).format("ll")}
                </p>
                {isOwner && renderActionMenu({ direction: "horizontal" })}
              </div>
            </div>

            <div className="grid grid-cols-3 items-end">
              {url && (
                <div className="col-span-1 flex justify-between">
                  <Link href={url}>
                    <a className="flex items-center" target="_blank">
                      <div className="mr-1 flex">
                        <Image
                          src={WebsiteIcon}
                          alt="fb-icon"
                          layout="fixed"
                          height="20"
                          width="20"
                        />
                      </div>
                      <p className="font-Montserrat font-light text-sm text-black">{url}</p>
                    </a>
                  </Link>
                </div>
              )}
              {isPublic && (
                <div className="col-start-2 flex justify-center">
                  <b className="text-lg mr-1">{votes.length}</b>
                  <button onClick={() => handleVote?.()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div className="col-start-3 flex justify-end items-center">
                {renderSocialMediaLinks({ lg: true })}
              </div>
            </div>
          </div>
        </div> */}

        <ModalDialog open={showDeleteProject} onClose={() => setShowDeleteProject(false)}>
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
              <p>The prospect will be deleted permanently. Are you sure you want to proceed?</p>
              <div className="flex justify-between">
                <button
                  className="bg-[#1BBD90] cursor-pointer px-8 p-2 text-white"
                  onClick={async () => {
                    handleDeleteProject?.()
                    setShowDeleteProject(false)
                  }}
                >
                  Yes, delete
                </button>
                <button
                  className="border-[#1BBD90]  border cursor-pointer px-8 p-2"
                  onClick={() => setShowDeleteProject(false)}
                  style={{ color: "#1BBD90" }}
                >
                  No, keep
                </button>
              </div>
            </div>
          </div>
        </ModalDialog>
      </div>
    </>
  )
}

export default ProjectCard

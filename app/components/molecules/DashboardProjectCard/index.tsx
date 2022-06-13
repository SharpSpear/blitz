/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"
import { Prospect, User, Record } from "db"
import { Image, useRouter, useMutation, Link, Routes, Router } from "blitz"
import { DropdownRender, DropdownItem } from "app/components/atoms/Dropdown/index"
import { CarbonViewIcon, DeleteIcon, BlueDeleteIcon, EditIcon, LinkIcon } from "app/assets"
import ModalDialog from "app/components/molecules/ModalDialog"
import deleteProject from "app/prospects/mutations/deleteProject"
import ProjectImage from "app/components/molecules/ProjectImage"
import toast from "react-hot-toast"
import pluralise from "pluralise"
import { getFullName } from "app/core/utils/user"

interface IProps {
  project: Prospect & { owner: User | null; records: Record[] }
  refetch?: Function
}

const PersonalProjectCard = ({ project, refetch }: IProps) => {
  const router = useRouter()
  const [showDeleteProject, setShowDeleteProject] = useState(false)
  const [deleteProjectMutation] = useMutation(deleteProject)
  return (
    <div
      key={project.id}
      className="max-w-[220px] col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex sm:inline-block sm:flex-none shadow-md rounded-xl bg-[#F7F7F4] overflow-hidden"
    >
      <div className="sm:h-[200px] h-[100px] sm:max-h-[250px] w-[100px] sm:w-full mr-3 sm:mr-0 text-center overflow-hidden">
        <ProjectImage project={project} className="object-cover" />
      </div>
      <div className="flex-auto sm:w-full inline-block sm:pt-3  p-3 ">
        <div className="sm:flex sm:justify-between">
          <div className="flex flex-auto justify-between">
            <Link href={Routes.ShowProjectPage({ slug: project.slug })}>
              <a>
                <h2 className="text-black font-semibold cursor-pointer">{project.name}</h2>
              </a>
            </Link>
            <DropdownRender theme="white">
              <DropdownItem
                href={Routes.EditProjectPage({ slug: project.slug })}
                className="text-black flex gap-x-3"
              >
                <Image src={EditIcon} width="15" height="15" alt="edit" />
                <span>Edit prospect</span>
              </DropdownItem>
              <ModalDialog open={showDeleteProject} onClose={() => setShowDeleteProject(false)}>
                <div className="flex font-Montserrat justify-center">
                  <div
                    className="bg-white flex flex-col justify-between shadow-lg text-center p-8"
                    style={{
                      height: "346px",
                      width: "451px",
                    }}
                  >
                    <Image height="51" width="53" src={BlueDeleteIcon} />
                    <h5 className="text-2xl font-bold">Delete this prospect?</h5>
                    <p>
                      The prospect will be deleted permanently. Are you sure you want to proceed?
                    </p>
                    <div className="flex justify-between">
                      <div
                        className="bg-[#1BBD90] cursor-pointer px-8 p-2 text-white"
                        onClick={async () => {
                          await deleteProjectMutation({ slug: project.slug })
                          if (refetch) {
                            refetch()
                          }
                          setShowDeleteProject(false)
                        }}
                      >
                        Yes, delete
                      </div>
                      <div
                        className="border-[#1BBD90] border cursor-pointer px-8 p-2"
                        onClick={() => setShowDeleteProject(false)}
                        style={{ color: "#1BBD90" }}
                      >
                        No, keep
                      </div>
                    </div>
                  </div>
                </div>
              </ModalDialog>
              <DropdownItem
                onClick={() => {
                  setShowDeleteProject(true)
                }}
                className="text-black flex gap-x-3"
              >
                <Image src={DeleteIcon} width="15" height="15" alt="delete" />
                <span>Delete prospect</span>
              </DropdownItem>
              {/* <DropdownItem
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href + "projects/" + project.slug)
                  toast.success("Copied to clipboard!")
                }}
                className="text-black flex gap-x-3"
              >
                <Image src={LinkIcon} width="15" height="15" alt="link" />
                <span>Copy prospect link</span>
              </DropdownItem> */}
            </DropdownRender>
          </div>
        </div>
        <div className="flex flex-col sm:justify-start justify-between pb-3 sm:flex-row gap-x-2 h-[calc(100%-0.75rem)] sm:pt-3 text-xs sm:text-sm">
          {getFullName(project.owner) && (
            <>
              <span>{getFullName(project.owner)}</span>
              <span className="hidden sm:inline-block">&bull;</span>
            </>
          )}
          <span>{pluralise.withCount(project.records.length, "% record")}</span>
        </div>
      </div>
    </div>
  )
}

interface TProps {
  project: Prospect & { owner: User | null; records: Record[] }
}

export const DiscoverProjectCard = ({ project }: TProps) => {
  return (
    <div
      key={"discover_" + project.id}
      className="max-w-[220px] col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 flex sm:inline-block sm:flex-none shadow-md rounded-xl bg-[#F7F7F4] overflow-hidden"
    >
      <div className="sm:h-[200px] h-[100px] sm:max-h-[250px] w-[100px] sm:w-full mr-3 sm:mr-0 text-center overflow-hidden">
        <ProjectImage project={project} className="object-cover" />
      </div>
      <div className="flex-auto sm:w-full inline-block p-3">
        <div>
          <div className="flex justify-between">
            <Link href={Routes.ShowProjectPage({ slug: project.slug })}>
              <a>
                <h2 className="text-black font-semibold cursor-pointer">{project.name}</h2>
              </a>
            </Link>
            <DropdownRender theme="white" position="top">
              <DropdownItem href="/explore" className="text-black flex gap-x-3">
                <Image src={CarbonViewIcon} width="15" height="15" alt="view" />
                <span className="text-sm">Other prospects</span>
              </DropdownItem>
              {/* <DropdownItem
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href + "projects/" + project.slug)
                  toast.success("Copied to clipboard!")
                }}
                className="text-black flex gap-x-3"
              >
                <Image src={LinkIcon} width="15" height="15" alt="link" />
                <span>Copy prospect link</span>
              </DropdownItem> */}
            </DropdownRender>
          </div>
        </div>
        <div className="flex-col justify-between sm:flex-row sm:justify-start pb-3 flex gap-x-2 h-[calc(100%-0.75rem)] sm:pt-3 text-xs sm:text-sm">
          {getFullName(project.owner) && (
            <>
              <span>{getFullName(project.owner)}</span>
              <span className="hidden sm:inline-block">&bull;</span>
            </>
          )}
          <span>{pluralise.withCount(project.records.length, "% record")}</span>
        </div>
      </div>
    </div>
  )
}
interface JProps {
  project?: Prospect & { owner: User | null; records: Record[] }
  image?: string
}

export const ProjectCard = ({ project, image }: JProps) => {
  return (
    <div
      key={"discover_" + (project ? project!.id : Math.random())}
      className="sm:w-box-width lg:col-span-3 col-span-full flex sm:inline-block sm:flex-none p-3 shadow-md rounded-md bg-white"
    >
      <div className="sm:h-[200px] h-[100px] sm:max-h-[250px] w-[100px] sm:w-full mr-3 sm:mr-0 text-center overflow-hidden">
        {project ? (
          <ProjectImage project={project} className="object-cover" />
        ) : (
          <img src={image ?? "/images/prospect/1.png"} alt="" />
        )}
      </div>
      <div className="flex-auto sm:w-full inline-block pt-3">
        <div>
          <div className="flex justify-between">
            {/* <Link href={Routes.ShowProjectPage({ slug: project.slug })}> */}
            <a>
              <h2 className="text-black font-semibold cursor-pointer">
                {project ? project.name : "Null"}
              </h2>
            </a>
            {/* </Link> */}
            <DropdownRender theme="white" position="top">
              <DropdownItem href="/explore" className="text-black flex gap-x-3">
                <Image src={CarbonViewIcon} width="15" height="15" alt="view" />
                <span className="text-sm">Other prospects</span>
              </DropdownItem>
            </DropdownRender>
          </div>
        </div>
        <div className="flex-col justify-between sm:flex-row sm:justify-start pb-3 flex gap-x-2 h-[calc(100%-0.75rem)] sm:pt-3 text-xs sm:text-sm">
          {project
            ? getFullName(project.owner) && (
                <>
                  <span>{getFullName(project.owner)}</span>
                  <span className="hidden sm:inline-block">&bull;</span>
                </>
              )
            : "John doe"}
          <span>
            {project ? pluralise.withCount(project.records.length, "% record") : "4 records"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PersonalProjectCard

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Link, useQuery, Routes, useRouter, useMutation, useParam } from "blitz"
import getProjects from "app/prospects/queries/getProjects"
import { ExtendedUser } from "types"
import { LabeledSelect, SelectOption } from "app/components/molecules/LabeledSelect"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import { LogoutIcon, ProspectIcon } from "app/assets"
import logout from "app/auth/mutations/logout"

import { each, isArray } from "lodash"

import styles from "./styles.module.scss"
import { useUser } from "app/contexts/user.context"
import { Workspace } from "db"

import DashboardIcon from "@mui/icons-material/Dashboard"
import AssessmentIcon from "@mui/icons-material/Assessment"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"

type NavbarProps = {
  user?: ExtendedUser | null
  hidden: Boolean
}

const Sidebar = ({ user, hidden }: NavbarProps) => {
  const [defaultWorkspaceId, setDefaultWorkspaceId] = useState()
  const [prospectMenu, setProspectMenu] = useState(true)

  const [logoutMutation] = useMutation(logout)
  const { workspaces } = useUser()

  const [workspaceOptions, setWorkspaceOptions] = useState<SelectOption[]>([])

  const slug = useParam("slug", "string") || ""

  const [{ projects }] = useQuery(getProjects, {
    where: { ownerId: user?.id },
    orderBy: { id: "asc" },
  })

  useEffect(() => {
    if (workspaces) {
      const options: SelectOption[] = []
      const selectedId = workspaces[0]?.id
      each(workspaces, (workspace) => {
        if (workspace.name) {
          options.push({
            value: workspace.id,
            text: workspace.name,
          })
        }
      })
      setWorkspaceOptions(options)
      if (selectedId) {
        setDefaultWorkspaceId(selectedId)
      }
    }
  }, [workspaces])

  const router = useRouter()

  const logoutAction = async () => {
    await router.push("/")
    await logoutMutation()
  }

  return (
    // <div className={styles.sidebar + " px-4  flex flex-col"}>
    //   <div className="flex flex-col space-y-10">
    //     <div className="mt-6 flex-initial w-56">
    //       <LabeledSelect
    //         name={"workspaces"}
    //         label={""}
    //         defaultValue={defaultWorkspaceId}
    //         options={workspaceOptions}
    //         contentWidth="w-56	"
    //       ></LabeledSelect>
    //     </div>
    //     <div className="">
    //       <p className="text-sm text-gray-400 mb-6">My prospects</p>
    //       <div className="mb-6">
    //         <ButtonPrimary
    //           onClick={() => {
    //             router.push(Routes.NewProjectPage())
    //           }}
    //           className="flex justify-start px-4 "
    //         >
    //           Create New Prospect
    //         </ButtonPrimary>
    //       </div>
    //       <ul className="text-md text-gray-400">
    //         {projects.map((project, i) => {
    //           const className =
    //             router.route.match("/projects") && slug === project.slug
    //               ? styles.activeProspect
    //               : ""
    //           return (
    //             <li key={i} className={className}>
    //               <Link href={Routes.ShowProjectPage({ slug: project.slug })}>
    //                 <a className="flex justify-start text-gray">
    //                   <Image
    //                     src={ProspectIcon}
    //                     alt="prospect-icon"
    //                     layout="fixed"
    //                     width="25"
    //                     height="25"
    //                   />
    //                   <p className="ml-3 text-gray">{project.name}</p>
    //                 </a>
    //               </Link>
    //             </li>
    //           )
    //         })}
    //       </ul>
    //     </div>
    //     <div>
    //       <hr className="pb-5" />
    //       {nav.map((item, i) => {
    //         return (
    //           <Link href={item.href} passHref key={i}>
    //             <a
    //               className={
    //                 "block text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
    //               }
    //             >
    //               {item.name}
    //             </a>
    //           </Link>
    //         )
    //       })}
    //     </div>
    //   </div>
    //   <div className="pt-20">
    //     <a onClick={logoutAction} className="flex justify-start text-gray">
    //       <Image src={LogoutIcon} alt="logout-icon" layout="fixed" width="24" height="24" />
    //       <p className="ml-3 text-black">Logout</p>
    //     </a>
    //   </div>
    // </div>
    <>
      <div className={"flex flex-col space-y-4 min-h-screen "}>
        <Link href="/">
          <div className="cursor-pointer  text-white flex  items-center">
            <DashboardIcon />
            <p className="ml-3 font-Opensans-SemiBold text-[18px] leading-[25px]">Dashboard</p>
          </div>
        </Link>

        <div
          onClick={() => setProspectMenu(!prospectMenu)}
          className="cursor-pointer text-Opensans-SemiBold text-[18px] leading-[25px] text-white flex items-center"
        >
          <AssessmentIcon />
          {/* <Image src="/images/my prospects.png" width={16} height={16} alt="dashboardicon" /> */}
          <p className="ml-3 font-Opensans-SemiBold text-[18px] leading-[25px] ">My Prospect</p>
          <p
            className={
              "ml-auto  prospect-menu-icon" + (prospectMenu ? " prospect-menu-icon-open" : "")
            }
          >
            <ArrowForwardIosIcon />
          </p>
        </div>
        {!hidden && (
          <div className={"prospect-menu " + (prospectMenu ? "prospect-menu-open" : "")}>
            <div className="overflow-hidden">
              <Link href="/prospects/new">
                <div
                  onClick={() => {
                    router.push(Routes.NewProjectPage())
                  }}
                  className="flex justify-start pl-9 text-white font-Opensans-SemiBold mt-4 cursor-pointer"
                >
                  Create New Prospect
                </div>
              </Link>
              {projects.map((project, i) => {
                const className =
                  router.route.match("/projects") && slug === project.slug
                    ? styles.activeProspect
                    : ""
                return (
                  <Link key={i} href={Routes.ShowProjectPage({ slug: project.slug })}>
                    <a
                      className={"flex justify-start text-gray pl-9 mt-3 items-center " + className}
                    >
                      <AssessmentIcon className="text-white" fontSize="small" />
                      <p className="ml-3 text-white font-Opensans">{project.name}</p>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
        <Link href="/explore">
          <div className="cursor-pointer text-Opensans-SemiBold text-[18px] leading-[25px] text-white flex items-center">
            <ExploreOutlinedIcon />
            {/* <Image src="/images/dashboardIcon.png" width={16} height={16} alt="dashboardicon" /> */}
            <p className="ml-3 font-Opensans-SemiBold text-[18px] leading-[25px]">Explore</p>
          </div>
        </Link>
        <Link href="/settings">
          <div
            className="cursor-pointer text-Opensans-SemiBold text-[18px] leading-[25px] text-white flex items-center"
            // onClick={() => routes.}
          >
            <SettingsOutlinedIcon />
            {/* <Image src="/images/dashboardIcon.png" width={16} height={16} alt="dashboardicon" /> */}
            <p className="ml-3 font-Opensans-SemiBold text-[18px] leading-[25px]">Settings</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar

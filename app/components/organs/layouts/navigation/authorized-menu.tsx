import React, { useEffect, useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { TriangleDownIcon, BellIcon } from "app/assets"
import { Routes, useMutation, useRouter, Link } from "blitz"
import logout from "app/auth/mutations/logout"
import { getFullName } from "app/core/utils/user"
import { getSignedUrl } from "app/core/utils/s3"
import { useUser } from "app/contexts/user.context"

import axios, { AxiosResponse } from "axios"
import { TWITTER_AUTH_SERVER } from "../../../../contexts/constant"

export default function AuthorizedMenu({ user }) {
  const { avatar } = useUser()
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const [photoUrl, setPhotoUrl] = useState("")

  const dropDownNav = {
    // {
    //   name: "My Account",
    //   href: Routes.Settings().pathname,
    //   query: { subsection: "profile-settings" },
    //   current: router.route === "/settings",
    // },
    // {
    //   name: "Plans and Benefits",
    //   href: Routes.Settings().pathname,
    //   query: { subsection: "subscriptions" },
    //   current: router.route === "/settings",
    // },
    // {
    //   name: "Security and Password",
    //   href: Routes.Settings().pathname,
    //   query: { subsection: "security-and-password" },
    //   current: router.route === "/settings",
    // },
    // {
    //   name: "Settings",
    //   href: Routes.Settings().pathname,
    //   query: { subsection: "profile-settings" },
    //   current: router.route === "/settings",
    // },
    // {
    name: "Sign Out",
    action: async () => {
      await router.push("/")
      await logoutMutation()
      window.location.href = "/"
    },
    // },
  }

  useEffect(() => {
    setPhotoUrl(avatar)
  }, [avatar, setPhotoUrl])

  return (
    <div className="flex ml-4">
      {/* <div className="hover:cursor-pointer bg-active w-12 mr-4 flex justify-center items-center">
        <Image src={BellIcon} alt="prospect-icon" layout="fixed" width="20" height="20" />
      </div> */}
      <DropdownMenu.Root modal={false} open={profileOpen} onOpenChange={setProfileOpen}>
        <div
          style={{ backgroundColor: "#EEEEEE", borderColor: "#7A7A7A", borderWidth: "1px" }}
          className=" lg:p-2 font-bold text-sm flex items-center rounded-xl cursor-pointer"
          onClick={async () => {
            await router.push("/settings")
          }}
        >
          {photoUrl && (
            // <img src={photoUrl}></img>
            <div
              className="flex justify-center items-center text-gray-400  w-8 h-8 rounded-full"
              style={{
                backgroundImage: `url('${photoUrl}')`,
                // backgroundSize: "cover",
              }}
            ></div>
          )}
          {!photoUrl && (
            <div className="flex justify-center items-center text-black-400 bg-gray-300 w-8 h-8 rounded-full">
              {String(user?.firstName?.charAt(0)).toLocaleUpperCase()}
            </div>
          )}
          <p className="mx-4 hidden lg:block text-black">{getFullName(user)}</p>
          <DropdownMenu.Trigger id="dropdown-trigger" className="focus-visible:outline-none">
            <div className="hidden lg:block" onClick={(e) => e.stopPropagation()}>
              <Image
                src={TriangleDownIcon}
                alt="prospect-icon"
                layout="fixed"
                width="12"
                height="12"
              />
            </div>
          </DropdownMenu.Trigger>
        </div>
        {/* 3 */}
        <DropdownMenu.Content
          align="end"
          className="min-w-full w-[200px] bg-active mt-4 p-3 shadow-md rounded"
        >
          <DropdownMenu.Item
            data-testid={`${dropDownNav.name}-navLink`}
            as={"button"}
            onSelect={async (e) => {
              e.stopPropagation()
              await dropDownNav.action()
            }}
          >
            {dropDownNav.name}
          </DropdownMenu.Item>
          {/* {dropDownNav.map((item, i) => {
            return (
              <DropdownMenu.Item
                key={i}
                data-testid={`${item.name}-navLink`}
                as={item.href ? "a" : "button"}
                onSelect={async (e) => {
                  e.preventDefault()
                  item.href
                    ? await router.push({ pathname: item.href, query: item.query })
                    : await item.action!()
                  setProfileOpen(false)
                }}
                className={
                  "w-full text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:text-gray-500 hover:bg-active2 focus:outline-none focus-visible:text-gray-500"
                }
              >
                {item.name}
              </DropdownMenu.Item>
            )
          })} */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}

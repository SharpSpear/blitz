import React, { useState, useEffect } from "react"
import { useRouter, useMutation, Link, Routes } from "blitz"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { ExtendedUser } from "types"
import logout from "app/auth/mutations/logout"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { TriangleDownIcon, BellIcon } from "app/assets"
import Logo from "app/components/atoms/Logo"
import { getFullName } from "app/core/utils/user"

type NavbarProps = {
  user?: ExtendedUser | null
}

const Navbar = ({ user }: NavbarProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const nav = [
    // {
    //   name: "Workspaces",
    //   href: "/",
    //   current: router.route === "/"
    // },
    {
      name: "About",
      href: "/about",
      current: router.route === "/about",
    },
    {
      name: "Contact us",
      href:  "mailto:know@whyvote.ph",
      current: router.route === "/contact-us",
    },
    {
      name: "Terms",
      href: "/terms-of-service",
      current: router.route === "/terms-of-service",
    },
  ]

  const dropDownNav = [
    {
      name: "Settings",
      href: Routes.Settings().pathname,
      current: router.route === "/settings",
    },
    {
      name: "Sign Out",
      action: async () => {
        await router.push("/")
        await logoutMutation()
      },
      href: "",
    },
  ]

  useEffect(() => {
    const closeDropdownsOnResize = () => {
      setMobileNavOpen(false)
      setProfileOpen(false)
    }
    window.addEventListener("resize", closeDropdownsOnResize)
    return () => window.removeEventListener("resize", closeDropdownsOnResize)
  }, [])

  return (
    <nav className="py-3 bg-white" id="navbar">
      <div className="px-4 lg:px-6 mx-auto flex space-x-6 justify-between items-center">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div className="lg:flex justify-between items-center w-full hidden">
          <div className="space-x-2 flex ml-28">
            {nav.map((item, i) => {
              return (
                <Link href={item.href} passHref key={i}>
                  <a
                    className={
                      "text-black hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              )
            })}
          </div>

          <div className="flex">
            <div className="hover:cursor-pointer bg-active w-12 mr-4 flex justify-center items-center">
              <Image src={BellIcon} alt="prospect-icon" layout="fixed" width="20" height="20" />
            </div>
            <DropdownMenu.Root modal={false} open={profileOpen} onOpenChange={setProfileOpen}>
              <DropdownMenu.Trigger id="dropdown-trigger">
                <div className="bg-active px-2 py-2 pr-4 font-bold text-sm flex items-center rounded">
                  <div className="bg-gray-200 w-8 h-8" />
                  <p className="mx-4">{getFullName(user)}</p>
                  <Image
                    src={TriangleDownIcon}
                    alt="prospect-icon"
                    layout="fixed"
                    width="12"
                    height="12"
                  />
                </div>
              </DropdownMenu.Trigger>
              {/* 3 */}
              <DropdownMenu.Content
                align="end"
                className="min-w-full w-36 bg-white text-white p-1 shadow-md rounded"
              >
                {dropDownNav.map((item, i) => {
                  return (
                    <DropdownMenu.Item
                      key={i}
                      data-testid={`${item.name}-navLink`}
                      as={item.href.length ? "a" : "button"}
                      onSelect={(e) => {
                        e.preventDefault()
                        item.href.length ? router.push(item.href) : item.action!()
                      }}
                      className={
                        "w-full text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:text-gray-500 hover:bg-active focus:outline-none focus-visible:text-gray-500"
                      }
                    >
                      {item.name}
                    </DropdownMenu.Item>
                  )
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        {/* 1 */}
        <div className="flex lg:hidden items-center">
          {mobileNavOpen ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
              }}
            >
              <XIcon className="h-6 w-6 text-white cursor-pointer text-indigo-400 hover:text-white" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
              }}
              data-testid="openMobileMenu"
            >
              <MenuIcon className="h-6 w-6 text-white cursor-pointer text-indigo-400 hover:text-white" />
            </button>
          )}
        </div>
      </div>
      {/* Mobile Nav */}
      {mobileNavOpen && (
        <div className="p-5 flex flex-col lg:hidden">
          {nav.map((item, i) => {
            return (
              <Link href={item.href} passHref key={i}>
                <a
                  className={`${
                    item.current ? "text-white bg-indigo-800" : "text-white hover:text-indigo-100"
                  } px-3 py-2 rounded-md text-sm font-medium w-full block`}
                >
                  {item.name}
                </a>
              </Link>
            )
          })}

          <div className="w-full h1 border border-indigo-700 rounded-full mt-4 mb-2" />

          {dropDownNav.map((item, i) => {
            return item.href.length ? (
              <Link href={item.href} passHref key={i}>
                <a
                  data-testid={`${item.name}-navLink`}
                  className={`px-4 py-2 text-sm text-white hover:text-indigo-100`}
                >
                  {item.name}
                </a>
              </Link>
            ) : (
              // 2
              <button
                data-testid={`${item.name}-navLink`}
                key={i}
                onClick={async (e) => {
                  e.preventDefault()
                  item.action && item.action()
                }}
                className="px-4 py-2 text-left text-sm text-white hover:text-indigo-100"
              >
                {item.name}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}
export default Navbar

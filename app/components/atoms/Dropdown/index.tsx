import React, { ReactElement, ReactNode } from "react"
import { Link } from "blitz"
import popper, { createPopper, VirtualElement } from "@popperjs/core"
import { DotsVerticalIcon, DotsHorizontalIcon } from "@heroicons/react/solid"
import { ELB } from "aws-sdk"

const Dropdown = ({
  theme,
  position = "down",
  direction = "vertical",
  textColor = "",
  left = "-left-40",
  width = "13",
  className = "",
  children,
}) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(((<div />) as unknown) as Element, (popper as unknown) as HTMLElement, {
      placement: "bottom-start",
    })
    setDropdownPopoverShow(true)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }
  // bg colors
  let bgColor
  theme === "white" ? (bgColor = "bg-blueGray-700") : (bgColor = "bg-" + theme + "-500")
  return (
    <div className="relative">
      <div className="w-full">
        <div className={"relative align-middle w-full" + " " + textColor}>
          {direction == "vertical" ? (
            <DotsVerticalIcon
              height="20"
              className={
                "dropdown-" +
                theme +
                " " +
                className +
                " " +
                "text-black font-bold cursor-pointer uppercase mr-1 mb-1 ease-linear transition-all duration-150" +
                bgColor
              }
              onClick={() => {
                dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
              }}
            />
          ) : (
            <DotsHorizontalIcon
              height="20"
              className={
                "dropdown-" +
                theme +
                " " +
                className +
                " " +
                "text-horizontal-dots font-bold cursor-pointer uppercase mr-1 mb-1 ease-linear transition-all duration-150" +
                bgColor
              }
              onClick={() => {
                dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
              }}
            />
          )}
          <div
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              " fixed h-screen w-screen right-0 top-0 z-40 bg-transparent"
            }
            onClick={() => {
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
            }}
          />
          <div
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              " " +
              (position === "top" ? "-top-100" : "") +
              " " +
              (theme === "white" ? "bg-white " : bgColor + " ") +
              left +
              " " +
              "text-base text-black absolute z-50 py-2 list-none text-left rounded shadow-lg mt-1"
            }
            style={{ minWidth: width + "rem" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export const DropdownRender = Dropdown

export const DropdownDivider = ({ color = null }) => {
  return (
    <div className={"h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"} />
  )
}
export const DropdownItem = ({
  href,
  onClick = () => {},
  children,
  autoClose = true,
  className = "",
}: {
  href?: any
  onClick?: Function
  children?: ReactNode[] | HTMLElement | Element | ReactElement
  className?: String
  autoClose?: boolean
}) => {
  return (
    <Link href={href ?? "#"}>
      <a
        className={
          className +
          " " +
          "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-active"
        }
        onClick={(e) => {
          if (!href && href != "#") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {children}
      </a>
    </Link>
  )
}

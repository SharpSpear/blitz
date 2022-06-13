import React, { useState, useEffect } from "react"
import { useRouter, Link, Routes } from "blitz"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import PrimaryButton from "app/components/atoms/Button/Primary"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import SignupPage from "app/auth/pages/signup"
import LoginPage from "app/auth/pages/login"
import Modal from "app/core/components/Modal"
import Logo from "app/components/atoms/Logo"
import ModalDialog from "../../ModalDialog"
import { MobileNav } from "./MobileNav"

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [showLogo, setShowLogo] = useState(true)
  const router = useRouter()

  const nav = [
    { name: "Product", href: "/", current: router.route === "/" },
    { name: "Feature", href: "/", current: router.route === "/" },
  ]
  const dropDownNav = [
    { name: "Sign up", href: Routes.SignupPage().pathname },
    { name: "Sign in", href: Routes.LoginPage().pathname },
  ]

  useEffect(() => {
    const closeDropdownsOnResize = () => {
      setMobileNavOpen(false)
    }
    window.addEventListener("resize", closeDropdownsOnResize)
    return () => window.removeEventListener("resize", closeDropdownsOnResize)
  }, [])

  return (
    <nav id="navbar" className="  bg-transparent w-full z-30 top-0 py-1 lg:py-4 lg:px-24 px-12  ">
      <div className="container  px-10 xs:px-6 flex justify-between ">
        <Logo className={`lg:hidden z-10 ${showLogo ? "" : "hidden"}`} />
        <div className=" lg:pl-14 lg:flex justify-between  items-center w-full hidden">
          <Logo />

          <div className=" flex z-10 justify-between w-2/4 pr-5">
            <div className=" flex space-x-2  z-10">
              {nav.map((item, i) => {
                return (
                  <Link href={item.href} passHref key={i}>
                    <a
                      className={`${item.current ? "" : ""} px-3 py-2 z-20 text-black font-normal`}
                    >
                      {item.name}
                    </a>
                  </Link>
                )
              })}
            </div>
            <div className="flex space-x-2">
              <ButtonOutlined
                onClick={async (e) => {
                  e.preventDefault()
                  // router.push(Routes.SignupPage())
                  setShowSignup(true)
                }}
              >
                Sign up
              </ButtonOutlined>
              <ModalDialog open={showSignup} onClose={() => setShowSignup(false)}>
                <SignupPage isModal={true} />
              </ModalDialog>
              <PrimaryButton
                onClick={async (e) => {
                  e.preventDefault()
                  // router.push(Routes.LoginPage())
                  setShowLogin(true)
                }}
              >
                Log in
              </PrimaryButton>
              <ModalDialog open={showLogin} onClose={() => setShowLogin(false)}>
                <LoginPage />
              </ModalDialog>
            </div>
          </div>
        </div>
        {/* 1 */}
        <div className="flex lg:hidden items-center z-10">
          {mobileNavOpen ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
                setShowLogo(true)
              }}
            >
              <XIcon className="h-6 w-6 cursor-pointer absolute right-10 top-1 text-indigo-400 hover:text-white" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
              }}
              data-testid="openMobileMenu"
            >
              <MenuIcon
                className="h-6 w-6 cursor-pointer absolute right-24 top-1 text-indigo-400 hover:text-white"
                onClick={(e) => {
                  setShowLogo(false)
                }}
              />
            </button>
          )}
        </div>
      </div>
      {/* Mobile Nav */}
      {mobileNavOpen && (
        <MobileNav />
        //         <div className=" z-30 p-5 w-1/2 flex h-screen flex-col lg:hidden bg-white" style={{width:"50vw"}} >
        //           {nav.map((item, i) => {
        //             return (
        //               <Link href={item.href} passHref key={i}>
        //                 <a
        //                   className={`${
        //                     item.current ? "bg-indigo-800" : "hover:text-indigo-100"
        //                   } px-3 py-2 rounded-md text-sm font-medium w-full block`}
        //                 >
        //                   {item.name}
        //                 </a>
        //               </Link>
        //             )
        //           })}

        //           <div className=" h-screen border border-indigo-700 rounded-full mt-4 mb-2"  />
        // {/*
        //           {dropDownNav.map((item, i) => {
        //             return item.href.length ? (
        //               <Link href={item.href} passHref key={i}>
        //                 <a
        //                   data-testid={`${item.name}-navLink`}
        //                   className={`px-4 py-2 text-sm hover:text-indigo-100`}
        //                 >
        //                   {item.name}
        //                 </a>
        //               </Link>
        //             ) : (
        //               // 2
        //               <button
        //                 data-testid={`${item.name}-navLink`}
        //                 key={i}
        //                 onClick={async (e) => {
        //                   e.preventDefault()
        //                   // item.action && item.action()
        //                 }}
        //                 className="px-4 py-2 text-left text-sm text-white hover:text-indigo-100"
        //               >
        //                 {item.name}
        //               </button>
        //             )
        //           })} */}
        //         </div>
      )}
    </nav>
  )
}
export default Navbar

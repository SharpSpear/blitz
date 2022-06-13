import React, { useState, useEffect } from "react"
import { useRouter, Link, Routes } from "blitz"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import PrimaryButton from "app/components/atoms/Button/Primary"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import Logo from "../atoms/Logo"
import SignupPage from "app/auth/pages/signup"
import ModalDialog from "./ModalDialog"
import LoginPage from "app/auth/pages/login"
import Modal from "app/core/components/Modal"

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const router = useRouter()

  const nav = [{ name: "Prospects", href: "/", current: router.route === "/" }]
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
    <nav id="navbar" className="w-full z-30 top-0 py-1 lg:py-4">
      <div className="container xs:px-6 flex justify-between">
        <Logo className="lg:hidden" />
        <div className="lg:flex justify-between items-center w-full hidden">
          <Logo />
          <div className="space-x-2 flex">
            {nav.map((item, i) => {
              return (
                <Link href={item.href} passHref key={i}>
                  <a className={`${item.current ? "" : ""} px-3 py-2 text-black font-normal`}>
                    {item.name}
                  </a>
                </Link>
              )
            })}
          </div>
          <div className="space-x-2 flex">
            <ButtonOutlined
              onClick={async (e) => {
                e.preventDefault()
                router.push(Routes.SignupPage())
                setShowSignup(true)
              }}
            >
              Sign up
            </ButtonOutlined>
            <ModalDialog open={showSignup} onClose={() => setShowSignup(false)}>
              <SignupPage />
            </ModalDialog>
            <PrimaryButton
              onClick={async (e) => {
                e.preventDefault()
                router.push(Routes.LoginPage())
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
        {/* 1 */}
        <div className="flex lg:hidden items-center">
          {mobileNavOpen ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
              }}
            >
              <XIcon className="h-6 w-6 cursor-pointer text-indigo-400 hover:text-white" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                setMobileNavOpen(!mobileNavOpen)
              }}
              data-testid="openMobileMenu"
            >
              <MenuIcon className="h-6 w-6 cursor-pointer text-indigo-400 hover:text-white" />
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
                    item.current ? "bg-indigo-800" : "hover:text-indigo-100"
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
                  className={`px-4 py-2 text-sm hover:text-indigo-100`}
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
                  // item.action && item.action()
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

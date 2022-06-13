import React, { useState } from "react"
import { motion } from "framer-motion"
import { NavbarIcon } from "app/components/atoms/Icons/NavbarIcon"
import Logo from "app/components/atoms/Logo"
import { useUI } from "app/contexts/ui.context"
import { useRouter, Link, Routes } from "blitz"
import LoginPage from "app/auth/pages/login"
import SignupPage from "app/auth/pages/signup"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import ButtonPrimary from "app/components/atoms/Button/Primary"

import ModalDialog from "app/components/molecules/ModalDialog"
import SignDialog from "./SignDialog"

const Navbar = () => {
  const { toggleSidebar } = useUI()
  const router = useRouter()

  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const nav = [
    {
      name: "About",
      href: "/about",
      current: router.route === "/about",
    },
    {
      name: "Contact us",
      href: "mailto:know@whyvote.ph",
    },
    {
      name: "Terms",
      href: "/terms-of-service",
      current: router.route === "/terms-of-service",
    },
  ]

  const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"]
  const isAuthRoute = authRoutes.includes(router.route)

  return (
    <>
      <header className="bg-white shadow-lg  w-full z-40 fixed">
        <nav className="px-5 md:px-8 py-4 flex  lg:shadow-lg">
          {/* <!-- Mobile menu button --> */}

          <Logo />

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleSidebar}
            className="ml-auto mt-2 flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent lg:hidden"
          >
            <NavbarIcon />
          </motion.button>
          <div className="hidden lg:flex pl-2 ml-auto ">
            <div className="pl-32 space-x-2 py-3">
              {nav.map((item, i) => (
                <Link href={item.href} passHref key={i}>
                  <a
                    className={
                      "text-black hover:text-gray-500 h-full px-3 rounded-md text-sm font-medium"
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              ))}

              <input
                type="text"
                style={{
                  borderRadius: "30px",
                  backgroundColor: "#1BBD9030",
                  width: "380px",
                  height: "45px",
                  backgroundImage: "url('images/vector.png')",
                  paddingLeft: "40px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "10px 10px",
                  border: "0px",
                }}
                placeholder="Search ..."
              />
            </div>
          </div>
        </nav>
      </header>
      <SignDialog />
      {false && (
        <header
          className={` ${
            isAuthRoute ? "bg-active md:bg-white" : "bg-white"
          } shadow fixed w-full z-40 `}
        >
          <nav className="px-5 md:px-8 py-4 w-full">
            <div
              className={`${
                isAuthRoute ? "flex-grow flex justify-center p-3 md:hidden" : "hidden"
              }`}
            >
              <Logo />
            </div>
            <div className={`${isAuthRoute ? "hidden md:flex" : "flex"} justify-between w-full`}>
              {/* <!-- Mobile menu button --> */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={toggleSidebar}
                className="mt-2 flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent md:hidden"
              >
                <NavbarIcon />
              </motion.button>

              <Logo />
              <div className="hidden md:flex space-x-2 py-3 ">
                {nav.map((item, i) => {
                  return (
                    <Link href={item.href} passHref key={i}>
                      <a
                        className={
                          "text-black hover:text-gray-500 h-full px-3 rounded-md text-sm font-medium"
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  )
                })}
              </div>
              <div className="flex items-center space-s-8">
                {/**
                 * show different buttons for small and large screens
                 */}

                {/**
                 * buttons for large screens
                 */}
                <div className="space-x-2 hidden lg:flex">
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
                  <ButtonPrimary
                    onClick={async (e) => {
                      e.preventDefault()
                      // router.push(Routes.LoginPage())
                      setShowLogin(true)
                    }}
                  >
                    Log in
                  </ButtonPrimary>
                  <ModalDialog open={showLogin} onClose={() => setShowLogin(false)}>
                    <LoginPage />
                  </ModalDialog>
                </div>

                {/**
                 * buttons for small screens
                 */}
                <div className="space-x-2 flex lg:hidden">
                  <Link href={Routes.SignupPage()}>
                    <a>
                      <ButtonOutlined>Sign up</ButtonOutlined>
                    </a>
                  </Link>
                  <Link href={Routes.LoginPage()}>
                    <a>
                      <ButtonPrimary>Log in</ButtonPrimary>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  )
}

export default Navbar

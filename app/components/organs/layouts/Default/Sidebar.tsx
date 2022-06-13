import React from "react"
import { Link, Routes, useRouter } from "blitz"
import ButtonPrimary from "app/components/atoms/Button/Primary"

import styles from "./styles.module.scss"
import ButtonOutlined from "app/components/atoms/Button/Outlined"

const Sidebar = () => {
  const router = useRouter()

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

  return (
    <div className={styles.sidebar + " px-5 bg-[#1BBD90] h-full flex flex-col w-72"}>
      <div className="flex flex-col space-y-10">
        <ul className="text-md text-gray-400">
          {nav.map((item, i) => {
            const className = item.current ? styles.activeLink : ""
            return (
              <li key={i} className={className}>
                <Link href={item.href}>
                  <a className="flex justify-start text-white">
                    <p className="ml-3 text-white">{item.name}</p>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="absolute bottom-1">
        <div className={styles.footerButtons + " flex flex-col py-8 gap-y-2 space-s-8"}>
          <button
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.SignupPage())
            }}
            className="w-[200px] h-[30px] btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-green-700 hover:bg-green-700 text-black hover:text-white font-normal px-4 "
          >
            Sign Up
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.LoginPage())
            }}
            className="w-[200px] h-[30px] btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-900 text-white font-normal  px-4 "
          >
            Log In
          </button>
          {/* 
          <ButtonPrimary
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.LoginPage())
            }}
            className="block"
          >
            Log in
          </ButtonPrimary>
          <ButtonOutlined
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.SignupPage())
            }}
            className="block"
          >
            Sign up
          </ButtonOutlined> */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

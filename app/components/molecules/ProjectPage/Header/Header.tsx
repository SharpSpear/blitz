import React from "react"
import { Link, useRouter, Routes } from "@blitzjs/core"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import Logo from "app/components/atoms/Logo"

const Header: React.FC = ({}) => {
  const router = useRouter()

  const nav = [{ name: "Discover", href: "/#", current: router.route === "/" }]
  return (
    <div className="flex justify-between bg-white px-12 py-7">
      <div className="flex justify-between flex ">
        <Logo />
        <div className="space-x-2 flex ml-10 ">
          {nav.length > 1 &&
            nav.map((item, i) => {
              return (
                <Link href={item.href} passHref key={i}>
                  <a
                    className={`${
                      item.current ? "" : ""
                    } px-3 py-2 rounded-md text-black text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                </Link>
              )
            })}
        </div>
      </div>
      {nav.length <= 1 && (
        <div className="space-x-2 flex">
          {nav.map((item, i) => {
            return (
              <Link href={item.href} passHref key={i}>
                <a
                  className={`${
                    item.current ? "" : ""
                  } px-3 py-2 rounded-md text-black text-sm font-medium`}
                >
                  {item.name}
                </a>
              </Link>
            )
          })}
        </div>
      )}
      <div className="flex">
        <div className="space-x-2 flex">
          <ButtonOutlined
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.SignupPage())
            }}
          >
            Signup
          </ButtonOutlined>
          <ButtonPrimary
            onClick={async (e) => {
              e.preventDefault()
              router.push(Routes.LoginPage())
            }}
          >
            Log in
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export { Header }

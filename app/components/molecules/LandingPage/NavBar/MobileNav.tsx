import { Link } from "@blitzjs/core"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import Logo from "app/components/atoms/Logo"
import React from "react"
import styles from "./mobile.nav.module.scss"

export type IMobileNavProps = {}
const nav = [
  { name: "Product", href: "/" },
  { name: "Feature", href: "/" },
]
const MobileNav: React.FC<IMobileNavProps> = ({}) => {
  return (
    <div className="-mt-6   w-60  h-screen absolute bg-white z-30 flex flex-col  justify-between ">
      <div className="flex flex-col space-y-12">
        <div className={`${styles.logo} w-full p-6`}>
          <Logo className="pt-6" />
        </div>
        <div className="flex flex-col space-y-4 px-8">
          {nav.map((item, i) => {
            return (
              <Link href={item.href} passHref key={i}>
                <a className="font-Neometric text-sm text-gray-800 font-normal">{item.name}</a>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-8 pb-20 px-5">
        <ButtonOutlined>Sign Up</ButtonOutlined>
        <ButtonPrimary>Sign in</ButtonPrimary>
      </div>
    </div>
  )
}

export { MobileNav }

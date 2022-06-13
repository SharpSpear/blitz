import { Nav } from "app/components/atoms/Footer/Nav"
import Logo from "app/components/atoms/Logo"
import React from "react"
import styles from "./footer.module.scss"

export type IindexProps = {}

const Footer: React.FC<IindexProps> = ({}) => {
  return (
    <div
      className={`flex w-full space-y-8 flex-col md:flex-row justify-between px-28 pt-8 lg:pt-20 items-start ${styles.footer}`}
    >
      <Logo className="md:ml-16" />
      <div className="flex flex-col md:flex-row md:-mt-1">
        <div className="flex justify-between">
          <div className="flex-col flex space-y-4 items-start ">
            <h1 className="font-Montserrat text-lg font-semibold mb-8">Product</h1>
            <Nav text="Overview" />
            <Nav text="Features" />
          </div>
          <div className="flex-col flex space-y-4 items-start">
            <h1 className="font-Montserrat text-lg font-semibold mb-8">Support</h1>
            <Nav text="Help Center" />
            <Nav text="Terms of service" />
            <Nav text="Privacy Policy" />
          </div>
        </div>
        <div className="flex-col flex space-y-4 items-start">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="  font-Montserrat text-lg font-semibold mb-8">Reach us</h1>
            <Nav text="hello@whyvote.com" icon="/svg-icons/Message.png" />
            <Nav text="+91 98765 43210" icon="/svg-icons/Mobile.png" />
            <Nav
              text="772 Lyonwood Ave
Walnut, CA 91789"
              icon="/svg-icons/Location.png"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Footer }

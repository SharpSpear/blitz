import React from "react"
import { motion } from "framer-motion"
import { NavbarIcon } from "app/components/atoms/Icons/NavbarIcon"
import Logo from "app/components/atoms/Logo"
import { useUI } from "app/contexts/ui.context"
import { useEffect } from "react"
import AuthorizedMenu from "./authorized-menu"
import { useRouter, Link } from "blitz"
import { useUser } from "app/contexts/user.context"
import { each, isArray } from "lodash"
import { Workspace } from "db"

const Navbar = ({ user }) => {
  const { toggleSidebar } = useUI()
  const router = useRouter()

  const nav = [
    // {
    //   name: "Timeline",
    //   href: "/",
    //   current: router.route === "/",
    // },
    // {
    //   name: "Prospects",
    //   href: "/discover",
    //   current: router.route === "/discover",
    // },
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
    <header className="bg-white shadow w-full z-40 shadow-lg fixed">
      <nav className="px-5 md:px-8 py-4 flex ">
        <Logo />
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="ml-auto mt-2 flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="hidden lg:flex pl-2 ml-auto ">
          <div className="space-x-2 py-3">
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

        <div className="flex items-center space-x-8">
          <AuthorizedMenu user={user} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar

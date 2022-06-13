import React, { useEffect, ReactNode, useState } from "react"

import MobileNavigation from "../navigation/mobile-navigation"
import Navbar from "../navigation/top-navbar"

import { Head } from "blitz"
import { ExtendedUser } from "types"
import { UIProvider } from "app/contexts/ui.context"
import Sidebar from "./Sidebar"
import { AuthWrapper } from "app/users/components/AuthWrapper"
import { UserProvider } from "app/contexts/user.context"
import Footer2 from "app/components/molecules/Footer2"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

type LayoutProps = {
  title?: string
  children: ReactNode
  user?: ExtendedUser | null
  workspaces?: ExtendedUser | null
}
const AuthLayout = ({ title, children, user }: LayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <UIProvider>
      <Head>
        <title>
          {title} {process.env.PROJECT_NAME}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <AuthWrapper user={user}>
          {isLoaded && (
            <div className=" bg-background flex flex-col transition-colors duration-150">
              <Navbar user={user} />
              <MobileNavigation>
                <Sidebar user={user} hidden={hidden} />
              </MobileNavigation>

              <div className="flex  mt-20">
                <aside
                  className={
                    "shadow w-76 xl:w-80 hidden md:block   px-4 pt-22 flex-grow-0 flex-none relative " +
                    (hidden ? "max-w-[40px] pl-2 overflow-hidden" : "pl-4")
                  }
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(27,189,144,1) 0%, rgba(22,174,132,1) 100%)",
                  }}
                >
                  <div className="flex flex-col space-y-6 pt-20">
                    <Sidebar user={user} hidden={hidden} />
                  </div>

                  <div
                    className="absolute right-2 bottom-3 cursor-pointer"
                    onClick={() => setHidden(!hidden)}
                  >
                    {!hidden ? (
                      <KeyboardDoubleArrowLeftIcon sx={{ color: "white", fontSize: "30px" }} />
                    ) : (
                      <KeyboardDoubleArrowRightIcon sx={{ color: "white", fontSize: "30px" }} />
                    )}
                  </div>
                </aside>
                <main className="overflow-x-auto w-full">
                  <div className="p-5 md:p-8 overflow-y-auto h-full">{children}</div>
                </main>
              </div>
              <Footer2 />
            </div>
          )}
        </AuthWrapper>
      </UserProvider>
    </UIProvider>
  )
}

export default AuthLayout

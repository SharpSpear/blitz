import React, { ReactNode, useEffect, useState } from "react"
import { Head } from "blitz"
import MainContent from "./MainContent"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { UIProvider } from "app/contexts/ui.context"
import MobileNavigation from "../navigation/mobile-navigation"
import Footer2 from "app/components/molecules/Footer2"

type LayoutProps = {
  title?: string
  children: ReactNode
}

/*
 * Public Layout
 */

const PublicLayout = ({ title, children }: LayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <UIProvider>
      <Head>
        <title>
          {title ? title + " - " : ""}
          {process.env.BLITZ_PUBLIC_PROJECT_NAME}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoaded && (
        <>
          <div id="navbar" className="bg-white">
            <Navbar />
            <MobileNavigation>
              <Sidebar />
            </MobileNavigation>
          </div>
          <div id="content" className="z-40">
            {/* <div className="items-center justify-center pt-20 overflow-x-auto"> */}
            <div className="items-center justify-center overflow-x-auto">
              <MainContent>{children}</MainContent>
            </div>
          </div>
          <Footer2 />
        </>
      )}
    </UIProvider>
  )
}

export default PublicLayout

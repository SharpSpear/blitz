import React, { ReactNode } from "react"
import { Head } from "blitz"
import MainContent from "../../components/molecules/MainContent"
import Navbar from "app/components/molecules/Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}
/*
 * Public Layout
 */

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {title ? title + " - " : ""}
          {process.env.BLITZ_PUBLIC_PROJECT_NAME}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="navbar" className="bg-white">
        <Navbar />
      </div>
      <div id="content" className="z-40">
        <div className="container mx-lg items-center justify-center py-20">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </>
  )
}

export default Layout

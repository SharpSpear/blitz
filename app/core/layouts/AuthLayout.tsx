import { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "app/core/components/user/Navbar"
import Sidebar from "app/core/components/Sidebar"
import { ExtendedUser } from "types"
import Footer2 from "app/components/molecules/Footer2"

type LayoutProps = {
  title?: string
  children: ReactNode
  user?: ExtendedUser | null
}

const Layout = ({ title, children, user }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "404"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user ? user : undefined} />
      <main className="flex">
        <Sidebar user={user} />
        <div className="flex-grow-1 mx-auto py-6 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
          <div className="px-4 py-4 sm:px-0">{children}</div>
        </div>
      </main>
      <Footer2 />
    </>
  )
}

export default Layout

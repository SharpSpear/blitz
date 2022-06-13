import { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "app/core/components/user/Navbar"
import Sidebar from "app/core/components/Sidebar"
import { ExtendedUser } from "types"

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
      <main className="max-w-full">{children}</main>
    </>
  )
}

export default Layout

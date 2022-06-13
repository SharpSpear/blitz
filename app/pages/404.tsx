import { Head, Router, useQuery } from "blitz"
import AuthErrorLayout from "app/core/layouts/AuthErrorLayout"
import styles from "styles/404.module.scss"
import getCurrentUserWithMembership from "../users/queries/getCurrentUserWithMembership"
import Layout from "../core/layouts/Layout"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  const [user] = useQuery(getCurrentUserWithMembership, null)

  const content = (
    <div
      className="grid grid-cols-12 font-Montserrat fixed top-0 w-screen"
      style={{
        zIndex: -10,
      }}
    >
      <div className="md:col-span-6 col-span-full bg-white h-screen flex md:px-28 px-10 text-left justify-center flex-col">


      </div>

      <div className="col-span-6 hidden md:flex align-middle justify-center bg-contain md:bg-50 pt-20 bg-404 bg-no-repeat bg-center" />

    </div>
  )

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      {user ? <AuthErrorLayout user={user}>{content}</AuthErrorLayout> : <Layout>{content}</Layout>}
    </>
  )
}

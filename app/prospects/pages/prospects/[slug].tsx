import React, { Suspense } from "react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "blitz"
import AuthLayout from "app/components/organs/layouts/Auth"
import DefaultLayout from "app/components/organs/layouts/Default"
import path from "path"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import PublicProject from "app/prospects/components/PublicProject"
import Project from "app/prospects/components/Project"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/blitz/db.js")
  // End anti-tree-shaking

  const user = await getCurrentUserServer({ ...context })

  if (user) {
    return {
      props: {
        user,
      },
    }
  }

  return {
    props: {},
  }
}

const ShowProjectPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (user) {
    return (
      <AuthLayout user={user}>
        <Suspense fallback={<div>Loading...</div>}>
          <Project user={user} />
        </Suspense>
      </AuthLayout>
    )
  } else {
    return (
      <DefaultLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <PublicProject />
        </Suspense>
      </DefaultLayout>
    )
  }
}

ShowProjectPage.authenticate = false

export default ShowProjectPage

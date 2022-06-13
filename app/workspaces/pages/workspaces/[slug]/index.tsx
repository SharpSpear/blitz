import React from "react"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  Link,
  Routes,
  AuthorizationError,
  ErrorComponent,
  getSession,
  Image,
} from "blitz"
import path from "path"
import Guard from "app/guard/ability"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import AuthLayout from "app/core/layouts/AuthLayout"
import Breadcrumbs from "app/core/components/Breadcrumbs"

import getWorkspace from "app/workspaces/queries/getWorkspace"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/__db.js")
  // End anti-tree-shaking
  const user = await getCurrentUserServer({ ...context })
  const session = await getSession(context.req, context.res)
  // const profilePic = ''
  const { can: canUpdate } = await Guard.can(
    "update",
    "workspace",
    { session },
    { where: { slug: context?.params?.slug as string } }
  )

  if (user) {
    try {
      const workspace = await invokeWithMiddleware(
        getWorkspace,
        {
          where: { slug: context?.params?.slug as string },
        },
        { ...context }
      )

      return {
        props: {
          user: user,
          canUpdate: canUpdate,
          workspace: workspace,
        },
      }
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return {
          props: {
            error: {
              statusCode: error.statusCode,
              message: "You don't have permission",
            },
          },
        }
      } else {
        return { props: { error: { statusCode: error.statusCode, message: error.message } } }
      }
    }
  } else {
    return {
      redirect: {
        destination: `/login?next=/workspaces/${context?.params?.slug}`,
        permanent: false,
      },
      props: {},
    }
  }
}

const SingleWorkspacePage = ({
  user,
  workspace,
  error,
  canUpdate,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (error) {
    return <ErrorComponent statusCode={error.statusCode} title={error.message} />
  }

  return (
    <AuthLayout user={user}>
      <Breadcrumbs ignore={[{ href: "/workspaces", breadcrumb: "Workspaces" }]} />

      {canUpdate && (
        <Link href={Routes.WorkspaceSettingsPage({ slug: workspace?.slug as string })} passHref>
          <a data-testid={`${workspace?.name && `${workspace?.name}-`}settingsLink`}>Settings</a>
        </Link>
      )}
    </AuthLayout>
  )
}

export default SingleWorkspacePage

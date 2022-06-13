import React from "react"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  useRouter,
  Routes,
  useMutation,
  AuthorizationError,
  ErrorComponent,
  getSession,
} from "blitz"
import path from "path"

import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import AuthLayout from "app/core/layouts/AuthLayout"
import toast from "react-hot-toast"
import Guard from "app/guard/ability"

import WorkspaceForm from "app/workspaces/components/WorkspaceForm"
import Breadcrumbs from "app/core/components/Breadcrumbs"
import updateWorkspace from "app/workspaces/mutations/updateWorkspace"
import { checkPlan } from "app/workspaces/utils/checkPlan"
import getWorkspace from "app/workspaces/queries/getWorkspace"
import WorkspaceSettingsLayout from "app/core/layouts/WorkspaceSettingsLayout"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/__db.js")
  // End anti-tree-shaking
  const user = await getCurrentUserServer({ ...context })
  const session = await getSession(context.req, context.res)
  const { can: canUpdate } = await Guard.can(
    "update",
    "workspace",
    { session },
    { where: { slug: context?.params?.slug as string } }
  )

  if (user) {
    try {
      if (canUpdate) {
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
            workspace: workspace,
            currentPlan: checkPlan(workspace),
            canUpdate,
          },
        }
      } else {
        return {
          props: {
            error: {
              statusCode: 403,
              message: "You don't have permission",
            },
          },
        }
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
        destination: `/login?next=/workspaces/${context?.params?.slug}/settings`,
        permanent: false,
      },
      props: {},
    }
  }
}

const WorkspaceSettingsPage = ({
  user,
  workspace,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [updateWorkspaceMutation] = useMutation(updateWorkspace)

  if (error) {
    return <ErrorComponent statusCode={error.statusCode} title={error.message} />
  }
  return (
    <AuthLayout user={user}>
      <Breadcrumbs ignore={[{ breadcrumb: "Workspaces", href: "/workspaces" }]} />
      <WorkspaceSettingsLayout workspace={workspace!}>
        <WorkspaceForm
          header="Workspace Details"
          subHeader="Update your workspace details."
          initialValues={{
            name: workspace?.name,
          }}
          onSubmit={async (values) => {
            const toastId = toast.loading(() => <span>Updating Workspace</span>)
            try {
              await updateWorkspaceMutation({
                where: { id: String(workspace?.id || "") },
                data: { ...values },
                initial: workspace!,
              })
              toast.success(() => <span>Workspace Updated</span>, { id: toastId })
              router.push(Routes.Home())
            } catch (error) {
              toast.error(
                "Sorry, we had an unexpected error. Please try again. - " + error.toString()
              )
            }
          }}
        />
      </WorkspaceSettingsLayout>
    </AuthLayout>
  )
}

export default WorkspaceSettingsPage

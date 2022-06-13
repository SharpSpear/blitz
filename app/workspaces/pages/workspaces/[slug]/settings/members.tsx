import React from "react"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  useRouter,
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

import InvitationForm from "app/workspaces/components/InvitationForm"
import Breadcrumbs from "app/core/components/Breadcrumbs"
import inviteToWorkspace from "app/workspaces/mutations/inviteToWorkspace"
import removeFromWorkspace from "app/workspaces/mutations/removeFromWorkspace"
import getWorkspace from "app/workspaces/queries/getWorkspace"
import WorkspaceSettingsLayout from "app/core/layouts/WorkspaceSettingsLayout"
import Modal from "app/core/components/Modal"
import Confirm from "app/core/components/Confirm"
import { XCircleIcon } from "@heroicons/react/outline"

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

const WorkspaceSettingsMembersPage = ({
  user,
  workspace,
  canUpdate,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [inviteToWorkspaceMutation] = useMutation(inviteToWorkspace)
  const [removeFromWorkspaceMutation] = useMutation(removeFromWorkspace)

  if (error) {
    return <ErrorComponent statusCode={error.statusCode} title={error.message} />
  }
  return (
    <AuthLayout user={user}>
      <Breadcrumbs ignore={[{ breadcrumb: "Workspaces", href: "/workspaces" }]} />
      <WorkspaceSettingsLayout workspace={workspace!}>
        <div className="bg-white mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 md:p-6 md:flex md:flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2
                id="billing-history-heading"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Members
              </h2>
              <Modal header="Invite A User" open={open} setOpen={setOpen}>
                <InvitationForm
                  initialValues={{ email: "" }}
                  onSubmit={async (values) => {
                    const toastId = toast.loading(() => <span>Inviting {values.email}</span>)
                    try {
                      await inviteToWorkspaceMutation({
                        workspaceId: workspace?.id as string,
                        email: values.email,
                      })
                      toast.success(() => <span>{values.email} invited</span>, { id: toastId })
                    } catch (error) {
                      toast.error(
                        "Sorry, we had an unexpected error. Please try again. - " +
                          error.toString(),
                        { id: toastId }
                      )
                    }
                  }}
                />
              </Modal>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(true)
                }}
                data-testid={`open-inviteUser-modal`}
                className="text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700"
              >
                Invite User
              </button>
            </div>

            <div className="flex flex-col overflow-auto rounded-sm">
              <table className="table min-w-full border border-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workspace?.memberships.map((m, i) => {
                    return (
                      <tr key={i} className="bg-white">
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200"
                          data-testid={`workspace-member-${m.user.email}`}
                        >
                          {m.user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                          {canUpdate && user?.id !== m.user.id && (
                            <>
                              <Confirm
                                open={openConfirm}
                                setOpen={setOpenConfirm}
                                header={"Delete Member?"}
                                onSuccess={async () => {
                                  const toastId = toast.loading(() => (
                                    <span>Removing {m.user.email}</span>
                                  ))
                                  try {
                                    await removeFromWorkspaceMutation({
                                      workspaceId: workspace?.id as string,
                                      userId: m.user.id,
                                    })
                                    toast.success(() => <span>{m.user.email} removed</span>, {
                                      id: toastId,
                                    })
                                  } catch (error) {
                                    toast.error(
                                      "Sorry, we had an unexpected error. Please try again. - " +
                                        error.toString(),
                                      { id: toastId }
                                    )
                                  }
                                  setOpen(false)
                                  router.reload()
                                }}
                              >
                                Are you sure you want to remove this user from the workspace?
                              </Confirm>

                              <button
                                data-testid={`remove-${m.user.email}-fromWorkspace`}
                                className="bg-red-500 rounded-full"
                                onClick={async (e) => {
                                  e.preventDefault()
                                  setOpenConfirm(true)
                                }}
                              >
                                <XCircleIcon className="w-auto h-6 text-red-100" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </WorkspaceSettingsLayout>
    </AuthLayout>
  )
}

export default WorkspaceSettingsMembersPage

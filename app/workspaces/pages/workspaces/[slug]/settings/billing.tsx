import React from "react"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  useMutation,
  AuthorizationError,
  ErrorComponent,
  getSession,
} from "blitz"
import path from "path"
import { CheckIcon } from "@heroicons/react/outline"

import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import AuthLayout from "app/core/layouts/AuthLayout"
import toast from "react-hot-toast"
import Guard from "app/guard/ability"

import Breadcrumbs from "app/core/components/Breadcrumbs"
import SubscribeButton from "app/workspaces/components/SubscribeButton"
import { checkPlan } from "app/workspaces/utils/checkPlan"
import createStripeBillingPortal from "app/workspaces/mutations/createStripeBillingPortal"
import { plans } from "app/core/utils/plans"
import { Plan } from "types"
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

const WorkspaceSettingsBillingPage = ({
  user,
  workspace,
  currentPlan,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [createStripeBillingPortalMutation] = useMutation(createStripeBillingPortal)

  if (error) {
    return <ErrorComponent statusCode={error.statusCode} title={error.message} />
  }
  return (
    <AuthLayout user={user}>
      <Breadcrumbs ignore={[{ breadcrumb: "Workspaces", href: "/workspaces" }]} />
      <WorkspaceSettingsLayout workspace={workspace!}>
        <div className="bg-white mt-5 md:mt-0 md:col-span-2">
          <div className="sm:overflow-hidden">
            <div className="px-4 py-5 md:p-6 md:flex md:flex-col">
              <div className="mb-6">
                <h2
                  id="billing-history-heading"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Plans
                </h2>
              </div>

              {currentPlan ? (
                <div className="my-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Manage subscription
                  </h3>
                  <div className="mt-2 md:flex md:items-start md:justify-between">
                    <div className="max-w-xl text-sm text-gray-500">
                      <p>
                        View your past invoices, cancel your subscription , or update your card.
                      </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:ml-6 md:flex-shrink-0 md:flex md:items-center">
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={async (e) => {
                          e.preventDefault()
                          try {
                            const url = await createStripeBillingPortalMutation({
                              workspaceId: workspace?.id as string,
                            })

                            if (url) window.location.href = url
                          } catch (err) {
                            toast.error(err)
                          }
                        }}
                      >
                        Manage billing
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="md:grid md:gap-6 md:grid-flow-row md:grid-cols-3">
                  {Object.entries(plans).map(([k, v], i) => {
                    return (
                      <div key={i} className="mt-12 md:mt-0 space-y-12 lg:space-y-0 flex flex-col">
                        <div className="flex-1 pb-6">
                          <h3 className="text-xl font-semibold text-gray-900">{v.title}</h3>
                          <p className="mt-4 flex items-baseline text-gray-900">
                            <span className="text-5xl text-indigo-500 font-extrabold tracking-tight">
                              ${v.price}
                            </span>
                            <span className="ml-1 text-sm text-gray-400">{v.frequency}</span>
                          </p>
                          <p className="mt-6 text-gray-800">{v.description}</p>
                          <ul className="mt-6 space-y-6">
                            {v.features.map((feature) => (
                              <li key={feature} className="flex">
                                <span className="text-gray-500">- {feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <SubscribeButton
                          plan={k as Plan}
                          workspaceId={workspace?.id as string}
                          quantity={workspace?.memberships.length as number}
                          type="new"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* If workspace is subscribed, show other plans to upgrade/downgrade */}
              {currentPlan && (
                <div className="md:grid md:gap-6 md:grid-flow-row md:grid-cols-3">
                  {Object.entries(plans).map(([k, v], i) => {
                    if (k !== currentPlan) {
                      return (
                        <div
                          key={i}
                          className="mt-12 md:mt-0 space-y-12 lg:space-y-0 flex flex-col"
                        >
                          <div className="flex-1 pb-6">
                            <h3 className="text-xl font-semibold text-gray-900">{v.title}</h3>
                            <p className="mt-4 flex items-baseline text-gray-900">
                              <span className="text-5xl font-extrabold tracking-tight">
                                ${v.price}
                              </span>
                              <span className="ml-1 text-xl font-semibold">{v.frequency}</span>
                            </p>
                            <p className="mt-6 text-gray-500">{v.description}</p>
                            <ul className="mt-6 space-y-6">
                              {v.features.map((feature) => (
                                <li key={feature} className="flex">
                                  <CheckIcon
                                    className="flex-shrink-0 w-6 h-6 text-indigo-500"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 text-gray-500">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <SubscribeButton
                            plan={k as Plan}
                            workspaceId={workspace?.id as string}
                            quantity={workspace?.memberships.length as number}
                            type="update"
                          />
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </WorkspaceSettingsLayout>
    </AuthLayout>
  )
}

export default WorkspaceSettingsBillingPage

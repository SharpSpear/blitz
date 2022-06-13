import React, { ReactNode } from "react"
import { useRouter, Link } from "blitz"

import { CreditCardIcon, CogIcon, UserGroupIcon } from "@heroicons/react/outline"

import { ExtendedWorkspace } from "types"

type LayoutProps = {
  children: ReactNode
  workspace: ExtendedWorkspace
}

const WorkspaceSettingsLayout = ({ workspace, children }: LayoutProps) => {
  const router = useRouter()

  const subNavigation = [
    {
      name: "Details",
      href: `/workspaces/${workspace?.slug}/settings`,
      current: router.route === `/workspaces/[slug]/settings`,
      icon: CogIcon,
    },
    {
      name: "Billing",
      href: `/workspaces/${workspace?.slug}/settings/billing`,
      current: router.route === `/workspaces/[slug]/settings/billing`,
      icon: CreditCardIcon,
    },
    {
      name: "Members",
      href: `/workspaces/${workspace?.slug}/settings/members`,
      current: router.route === `/workspaces/[slug]/settings/members`,
      icon: UserGroupIcon,
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row mt-6 lg:space-x-4">
      <div className="w-full mb-6 lg:mb-0 lg:w-1/2">
        {subNavigation.map((item) => (
          <Link href={item.href} passHref key={item.name}>
            <a
              data-testid={`${item.name}-workspaceSettingsLink`}
              className={`${
                item.current
                  ? "bg-gray-50 text-indigo-600 hover:bg-white"
                  : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
              } group px-3 py-2 flex items-center text-sm font-medium`}
            >
              <item.icon
                className={`${
                  item.current ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"
                }flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
              />
              <span className="truncate">{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
      <div className="space-y-6 w-full">{children}</div>
    </div>
  )
}

export default WorkspaceSettingsLayout

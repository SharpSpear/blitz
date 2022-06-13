import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Link, useQuery } from "blitz"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Button from "app/components/atoms/Button/Primary"
import { ProspectIcon, TriangleDownIcon } from "app/assets"
import getProjects from "app/prospects/queries/getProjects"
import { ExtendedUser } from "types"

type NavbarProps = {
  user?: ExtendedUser | null
}

const Sidebar = ({ user }: NavbarProps) => {
  const [{ projects }] = useQuery(getProjects, {
    where: { ownerId: user?.id },
    orderBy: { id: "asc" },
  })

  const [dropdownOpen, setDropdownOpen] = useState(true)

  return (
    <div className="p-11 mt-1 bg-white">
      <DropdownMenu.Root modal={false} open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenu.Trigger id="dropdown-trigger" className="w-full">
          <div className="bg-active px-2 py-2 pr-4 font-bold text-sm  items-center rounded flex justify-between">
            <p className="text-base">Default Workspace</p>
            <Image
              src={TriangleDownIcon}
              alt="prospect-icon"
              layout="fixed"
              width="12"
              height="12"
            />
          </div>
        </DropdownMenu.Trigger>
      </DropdownMenu.Root>
      <div className="mt-20">
        <p className="text-sm text-gray-400 mb-6">My projects</p>
        <div className="mb-6">
          <Link href="/projects/new">
            <a>
              <Button>Create New Prospect</Button>
            </a>
          </Link>
        </div>
        <ul className="text-md text-gray-400">
          {projects.map((project, i) => (
            <li key={i} className="py-4 hover:bg-active">
              <Link href={`/projects/${project.id}`}>
                <a className="flex">
                  <Image
                    src={ProspectIcon}
                    alt="prospect-icon"
                    layout="fixed"
                    width="29"
                    height="29"
                  />
                  <p className="ml-3">{project.name}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar

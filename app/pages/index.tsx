import React, { useEffect, useState, useMemo, Suspense, useContext } from "react"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  Routes,
  Link,
  useRouter,
  usePaginatedQuery,
} from "blitz"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import path from "path"
import getWorkspaces from "app/workspaces/queries/getWorkspaces"
import Table from "app/core/components/Table"
import Skeleton from "react-loading-skeleton"
import LandingPage from "app/components/organs/landingpage"
import PublicLayout from "app/components/organs/layouts/Default"
import AuthLayout from "app/components/organs/layouts/Auth"
import DashboardPage from "app/components/organs/dashboardpage"
import Landing from "app/components/organs/Landing"
import Navbar from "app/components/molecules/LandingPage/NavBar"
import MobileNavigation from "app/components/organs/layouts/navigation/mobile-navigation"
import Sidebar from "app/core/components/Sidebar"

import { myContext } from "../contexts/twitter.context"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/blitz/db.js")
  // End anti-tree-shaking

  const user = await getCurrentUserServer({ ...context })

  if (user) {
    return { props: { user: user } }
  } else {
    return { props: { user: null } }
  }
}
const Workspaces = ({ user }) => {
  const ITEMS_PER_PAGE = 12
  const router = useRouter()
  const tablePage = Number(router.query.page) || 0
  const [data, setData] = useState<{}[]>([])
  const [query, setQuery] = useState({})

  useEffect(() => {
    const search = router.query.search
      ? {
          AND: {
            workspace: {
              name: {
                contains: JSON.parse(router.query.search as string),
                mode: "insensitive",
              },
            },
          },
        }
      : {}

    setQuery(search)
  }, [router.query])

  const [{ memberships, hasMore, count }] = usePaginatedQuery(getWorkspaces, {
    where: {
      userId: user?.id,
      ...query,
    },
    skip: ITEMS_PER_PAGE * Number(tablePage),
    take: ITEMS_PER_PAGE,
  })

  // Use blitz guard to check if user can update t

  let startPage = tablePage * ITEMS_PER_PAGE + 1
  let endPage = startPage - 1 + ITEMS_PER_PAGE

  if (endPage > count) {
    endPage = count
  }

  useMemo(async () => {
    let data: {}[] = []

    await memberships.forEach((membership) => {
      data = [
        ...data,
        {
          ...membership.workspace,
          canUpdate: membership.role === "OWNER",
        },
      ]

      setData(data)
    })
  }, [memberships])

  let columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: (props) => {
        return (
          <Link href={Routes.SingleWorkspacePage({ slug: props.cell.row.original.slug })} passHref>
            <a data-testid={`workspacelink`} className="text-indigo-600 hover:text-indigo-900">
              {props.cell.row.original.name}
            </a>
          </Link>
        )
      },
    },
    {
      Header: "Slug",
      accessor: "slug",
    },
    {
      Header: "",
      accessor: "action",
      Cell: (props) => {
        return (
          <>
            {props.cell.row.original.canUpdate && (
              <Link
                href={Routes.WorkspaceSettingsPage({ slug: props.cell.row.original.slug })}
                passHref
              >
                <a className="text-indigo-600 hover:text-indigo-900">Settings</a>
              </Link>
            )}
          </>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      pageCount={Math.ceil(count / ITEMS_PER_PAGE)}
      pageIndex={tablePage}
      pageSize={ITEMS_PER_PAGE}
      hasNext={hasMore}
      hasPrevious={tablePage !== 0}
      totalCount={count}
      startPage={startPage}
      endPage={endPage}
    />
  )
}

const Home = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const userObject = useContext(myContext)

  if (!user) {
    return <Landing />
  }
  return (
    <AuthLayout title="WhyVote | Dashboard" user={user}>
      {/* <Link href={Routes.NewProjectPage()} passHref>
        <a className="float-right text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700">
          New Project
        </a>
      </Link> */}

      <Suspense
        fallback={<Skeleton height={"120px"} style={{ borderRadius: 0, marginBottom: "6px" }} />}
      >
        {/* <h1>Dashboard</h1> */}
        <DashboardPage user={user} />
      </Suspense>
    </AuthLayout>
  )
}

export default Home

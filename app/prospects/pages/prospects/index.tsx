import React, { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, Routes, InferGetServerSidePropsType } from "blitz"
import getProjects from "app/prospects/queries/getProjects"
import PublicLayout from "app/components/organs/layouts/Default"
import AuthLayout from "app/core/layouts/AuthLayout"
import ProspectGuest from "app/components/organs/ProspectGuest"
import { getServerSideProps } from "app/pages"
import Skeleton from "react-loading-skeleton"
import Footer2 from "app/components/molecules/Footer2"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <h1>Prospects Listing here...</h1>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={Routes.ShowProjectPage({ slug: project.slug })}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  )
}

const ProjectsPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <AuthLayout title="WhyVote | 404" user={user}>
        <Link href={Routes.NewProjectPage()} passHref>
          <a className="float-right text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700">
            New Prospect
          </a>
        </Link>

        <Suspense
          fallback={<Skeleton height={"120px"} style={{ borderRadius: 0, marginBottom: "6px" }} />}
        >
          <ProjectsList />
        </Suspense>
      </AuthLayout>
      <Footer2 />
    </>
  )
}

ProjectsPage.authenticate = true

export default ProjectsPage

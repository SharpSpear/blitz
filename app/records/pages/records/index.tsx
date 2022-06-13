import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getChanges from "app/records/queries/getChanges"

const ITEMS_PER_PAGE = 100

export const ChangesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ changes, hasMore }] = usePaginatedQuery(getChanges, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {changes.map((change) => (
          <li key={change.id}>
            <Link href={Routes.ShowChangePage({ recordId: change.id })}>
              <a>{change.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ChangesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Changes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewChangePage()}>
            <a>Create Change</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ChangesList />
        </Suspense>
      </div>
    </>
  )
}

ChangesPage.authenticate = true
ChangesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ChangesPage

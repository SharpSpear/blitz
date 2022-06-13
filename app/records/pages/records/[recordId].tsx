import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getChange from "app/records/queries/getChange"
import deleteChange from "app/records/mutations/deleteChange"

export const Change = () => {
  const router = useRouter()
  const changeId = useParam("recordId", "number")
  const [deleteChangeMutation] = useMutation(deleteChange)
  const [change] = useQuery(getChange, { id: changeId })

  return (
    <>
      <Head>
        <title>Change {change.id}</title>
      </Head>

      <div>
        <h1>Change {change.id}</h1>
        <pre>{JSON.stringify(change, null, 2)}</pre>

        <Link href={Routes.EditChangePage({ recordId: change.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteChangeMutation({ id: change.id })
              router.push(Routes.ChangesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowChangePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ChangesPage()}>
          <a>Changes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Change />
      </Suspense>
    </div>
  )
}

ShowChangePage.authenticate = true
ShowChangePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowChangePage

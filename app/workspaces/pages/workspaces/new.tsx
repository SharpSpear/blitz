import {
  useRouter,
  InferGetServerSidePropsType,
  Routes,
  GetServerSidePropsContext,
  useMutation,
} from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import WorkspaceForm from "app/workspaces/components/WorkspaceForm"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import toast from "react-hot-toast"
import Breadcrumbs from "app/core/components/Breadcrumbs"
import createWorkspace from "app/workspaces/mutations/createWorkspace"
import path from "path"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/__db.js")
  // End anti-tree-shaking
  const user = await getCurrentUserServer({ ...context })

  if (user) {
    return { props: { user: user } }
  } else {
    return {
      redirect: {
        destination: "/login?next=index",
        permanent: false,
      },
      props: {},
    }
  }
}

const NewWorkspace = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [createWorkspaceMutation] = useMutation(createWorkspace)

  return (
    <AuthLayout title="New Workspace" user={user}>
      <Breadcrumbs ignore={[{ href: "/workspaces", breadcrumb: "Workspaces" }]} />
      <div className="mt-6">
        <WorkspaceForm
          header="Create A New Workspace"
          subHeader="Enter your workspace details."
          initialValues={{
            name: "",
          }}
          onSubmit={async (values) => {
            const toastId = toast.loading(() => <span>Creating Workspace</span>)
            try {
              await createWorkspaceMutation(values)
              toast.success(() => <span>Workspace Created</span>, { id: toastId })
              router.push(Routes.Home())
            } catch (error) {
              toast.error(
                "Sorry, we had an unexpected error. Please try again. - " + error.toString()
              )
            }
          }}
        />
      </div>
    </AuthLayout>
  )
}

export default NewWorkspace

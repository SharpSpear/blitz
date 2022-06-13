import {
  useRouter,
  useMutation,
  Routes,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  Link,
} from "blitz"
import AuthLayout from "app/components/organs/layouts/Auth"
import createChange from "app/records/mutations/createChange"
import { ChangeForm } from "app/records/components/ChangeForm"
import Subheading from "app/components/atoms/typography/SubHeading"
import { Change } from "app/records/validations"
import toast from "react-hot-toast"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import path from "path"
import { useQuery } from "blitz"
import getProjects from "app/prospects/queries/getProjects"
import { ChangeType } from "db"
import { imageUpload } from "app/core/utils/image"

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
    return {
      redirect: {
        destination: Routes.LoginPage(),
        permanent: false,
      },
      props: {},
    }
  }
}

const NewChangePage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [{ projects }] = useQuery(getProjects, {
    where: { ownerId: user?.id },
    orderBy: { id: "asc" },
  })

  const router = useRouter()
  const [createChangeMutation] = useMutation(createChange)

  const projectsRemapped = projects.map((project) => {
    return {
      text: project.name,
      value: {
        id: project.id,
        slug: project.slug,
      },
    }
  })

  const projectId = Number(router.query.projectId)
  const projectInitialValue = projectsRemapped.find((project) => project.value.id === projectId)
    ?.value

  const initialValues = {
    userPlan: user?.plan || undefined,
    type: ChangeType.TRACKRECORD,
    date: new Date(),
    project: projectInitialValue,
    privateDesc: "",
    publicDesc: "",
  }

  return (
    <AuthLayout title="Create New Record" user={user}>
      <div className="flex justify-between">
        <Subheading className="mb-12 font-Raleway-Bold">Create new record</Subheading>
        <p className="text-[16px] font-Raleway text-black">
          <Link href="/">
            <p className="inline text-gray-500 cursor-pointer">Home</p>
          </Link>
          {" / Create Record"}
        </p>
      </div>
      <ChangeForm
        user={user}
        projects={projectsRemapped}
        submitText="Create Record"
        cancelText="Cancel"
        onCancel={() => router.back()}
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={Change}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            if (values.image) {
              values.imageUrl = await imageUpload({
                userId: user?.id,
                dirName: "projectImage",
                file: values.image,
              })
            }

            await createChangeMutation(values)

            router.push(Routes.ShowProjectPage({ slug: values.project.slug }))
          } catch (error) {
            toast.error(error.toString())
          }
        }}
      />
    </AuthLayout>
  )
}

NewChangePage.authenticate = true

export default NewChangePage

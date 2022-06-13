import { useState, useEffect } from "react"
import {
  useRouter,
  useMutation,
  Routes,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  useQuery,
} from "blitz"
import AuthLayout from "app/components/organs/layouts/Auth"
import updateChange from "app/records/mutations/updateChange"
import { ChangeForm } from "app/records/components/ChangeForm"
import Subheading from "app/components/atoms/typography/SubHeading"
import { Change } from "app/records/validations"
import toast from "react-hot-toast"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import path from "path"
import getProjects from "app/prospects/queries/getProjects"
import getChange from "app/records/queries/getChange"
import { imageUpload, imageDelete } from "app/core/utils/image"

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

const EditChangePage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [{ projects }] = useQuery(getProjects, {
    where: { ownerId: user?.id },
    orderBy: { id: "asc" },
  })

  const [updateChangeMutation] = useMutation(updateChange)

  const changeId = Number(router.params.recordId)

  const [change, { refetch }] = useQuery(getChange, { id: changeId })

  const projectsRemapped = projects.map((project) => {
    return {
      text: project.name,
      value: {
        id: project.id,
        slug: project.slug,
      },
    }
  })

  const projectInitialValue = projectsRemapped.find(
    (project) => project.value.id === change.prospectId
  )?.value

  const initialValues = {
    userPlan: user?.plan || undefined,
    type: change.type,
    date: change.date,
    project: projectInitialValue,
    privateDesc: change.privateDesc,
    publicDesc: change.publicDesc,
    imageUrl: change.imageUrl,
  }

  return (
    <AuthLayout title="Create New Record" user={user}>
      <Subheading className="mb-12">Edit record</Subheading>
      <ChangeForm
        user={user}
        projects={projectsRemapped}
        submitText="Edit Record"
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
              await imageDelete(change.imageUrl)

              values.imageUrl = await imageUpload({
                userId: user?.id,
                dirName: "changeImage",
                file: values.image,
              })
            } else {
              values.imageUrl = values.imageUrl || ""
            }

            await updateChangeMutation({ ...values, changeId })
            refetch()

            router.push(Routes.ShowProjectPage({ slug: values.project.slug }))
          } catch (error) {
            toast.error(error.toString())
          }
        }}
      />
    </AuthLayout>
  )
}

EditChangePage.authenticate = true

export default EditChangePage

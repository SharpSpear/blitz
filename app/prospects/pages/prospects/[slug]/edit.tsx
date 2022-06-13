import React, { Suspense, useState } from "react"
import {
  useRouter,
  useQuery,
  useMutation,
  useParam,
  Routes,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "blitz"
import getProject from "app/prospects/queries/getProject"
import updateProject from "app/prospects/mutations/updateProject"
import { ProjectForm } from "app/prospects/components/ProjectForm"
import AuthLayout from "app/components/organs/layouts/Auth"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import { Project } from "app/prospects/validations"
import path from "path"
import SubHeading from "app/components/atoms/typography/SubHeading"
import { imageUpload, imageDelete } from "app/core/utils/image"
import toast from "react-hot-toast"
import getParties from "app/prospects/queries/getParties"

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
        destination: "/",
        permanent: false,
      },
      props: {},
    }
  }
}

const title = "Update Prospect"

export const EditProject = ({ user }) => {
  const router = useRouter()
  const slug = useParam("slug", "string") || ""
  const [project] = useQuery(
    getProject,
    { slug },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProjectMutation] = useMutation(updateProject)

  const [forcedErrors, setForcedErrors] = useState({})
  const [parties] = useQuery(getParties, {})

  return (
    <>
      <SubHeading className="mb-10">{title}</SubHeading>
      <ProjectForm
        parties={parties}
        user={user}
        forcederrors={forcedErrors}
        submitText={title}
        cancelText="Cancel"
        onCancel={() => router.back()}
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={Project}
        initialValues={project}
        onSubmit={async (values) => {
          try {
            if (values.image) {
              await imageDelete(project.imageUrl)

              values.imageUrl = await imageUpload({
                userId: user?.id,
                dirName: "projectImage",
                file: values.image,
              })
            } else {
              values.imageUrl = values.imageUrl || ""
            }

            const updatedProject = await updateProjectMutation({
              id: project.id,
              ...values,
            })

            router.push(Routes.ShowProjectPage({ slug: updatedProject.slug }))
          } catch (error) {
            toast.error(error.toString())
            if (String(error).toLowerCase().includes("slug")) {
              setForcedErrors({ slug: String(error) })
            }
          }
        }}
      />
    </>
  )
}

const EditProjectPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AuthLayout title={title} user={user}>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject user={user} />
      </Suspense>
    </AuthLayout>
  )
}

EditProjectPage.authenticate = true

export default EditProjectPage

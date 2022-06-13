import React, { useState } from "react"
import {
  Link,
  useRouter,
  useQuery,
  useMutation,
  Routes,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "blitz"
import AuthLayout from "app/components/organs/layouts/Auth"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import getParties from "app/prospects/queries/getParties"
import createProject from "app/prospects/mutations/createProject"
import { ProjectForm } from "app/prospects/components/ProjectForm"
import toast from "react-hot-toast"
import path from "path"
import { Project } from "app/prospects/validations"
import SubHeading from "app/components/atoms/typography/SubHeading"
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
        destination: "/",
        permanent: false,
      },
      props: {},
    }
  }
}

const NewProjectPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  const [parties] = useQuery(getParties, {})

  const title = "Create New Prospect"

  const [forcedErrors, setForcedErrors] = useState({})

  return (
    <AuthLayout title={title} user={user}>
      <SubHeading className="mb-5 lg:mb-10 font-Raleway-Bold">{title}</SubHeading>
      <ProjectForm
        parties={parties}
        user={user}
        forcederrors={forcedErrors}
        submitText="Create Prospect"
        cancelText="Cancel"
        onCancel={() => router.back()}
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={Project}
        initialValues={{ isPublic: false }}
        onSubmit={async (values) => {
          setForcedErrors({})
          try {
            if (values.image) {
              values.imageUrl = await imageUpload({
                userId: user?.id,
                dirName: "projectImage",
                file: values.image,
              })
            }

            const project = await createProjectMutation(values)

            router.push(Routes.ShowProjectPage({ slug: project.slug }))
          } catch (error) {
            toast.error(error.toString())
            if (String(error).toLowerCase().includes("slug")) {
              setForcedErrors({ slug: String(error) })
            }
          }
        }}
      />
    </AuthLayout>
  )
}

NewProjectPage.authenticate = true

export default NewProjectPage

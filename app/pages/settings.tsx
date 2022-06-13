import React, { useState, useEffect } from "react"

import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  useRouter,
  Routes,
  useMutation,
} from "blitz"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"
import path from "path"
import UserForm from "app/users/components/UserForm"
import PasswordForm from "app/users/components/PasswordForm"
import Subscriptions from "app/users/components/Subscriptions"
import toast from "react-hot-toast"
import updateUser from "app/users/mutations/updateUser"
import changePassword from "app/auth/mutations/changePassword"
import { ChangePassword } from "app/auth/validations"

import AuthLayout from "app/components/organs/layouts/Auth"
import SubHeading from "app/components/atoms/typography/SubHeading"
import { UserSettings } from "app/users/validations"

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
        destination: "/login?next=settings",
        permanent: false,
      },
      props: {},
    }
  }
}

const subsections = [
  {
    label: "Upgrade",
    query: "upgrade",
  },
  {
    label: "Settings",
    query: "settings",
  },
  {
    label: "Change Password",
    query: "change-password",
  },
]

const Settings = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [updateUserMutation] = useMutation(updateUser)
  const [changePasswordMutation] = useMutation(changePassword)
  const [activeSection, setActiveSection] = useState(1)

  const title = "Settings"

  const subtitle = subsections[activeSection]?.label

  const handleSubsectionClick = (i: number) => {
    setActiveSection(i)
    router.push(`${router.pathname}?subsection=${subsections[i]?.query}`)
  }

  useEffect(() => {
    if (router.isReady) {
      const subsectionFromQuery = subsections.find((s) => s.query === router.query.subsection)
      if (subsectionFromQuery) {
        setActiveSection(subsections.indexOf(subsectionFromQuery))
      }
    }
  }, [router])
  return (
    <AuthLayout title={title} user={user}>
      <div className="flex flex-col items-center">
        <div className="flex  ">
          {/* <ul> */}
          {subsections.map(({ label }, i) => (
            <div key={i} className="mx-3">
              <p
                className={`px-6 py-3 text-sm cursor-pointer ${
                  activeSection === i ? "bg-active2 border-t-4 border-[#49caa6]" : "border-t-4"
                }`}
                onClick={() => handleSubsectionClick(i)}
              >
                {label}
              </p>
            </div>
          ))}
          {/* </ul> */}
        </div>
        {activeSection === 0 && (
          <div className="w-full">
            {/* <SubHeading className="mb-10 text-3xl">{subtitle}</SubHeading> */}
            <Subscriptions currentPlan={user?.plan ?? "FREE"} />
          </div>
        )}
        {activeSection === 1 && (
          <div className="w-full">
            {/* <SubHeading className="mb-10 text-3xl">{subtitle}</SubHeading> */}
            <UserForm
              currentPlan={user?.plan ?? "FREE"}
              submitText="Save changes"
              initialValues={{
                ...user,
              }}
              schema={UserSettings}
              onSubmit={async (values) => {
                const toastId = toast.loading(() => <span>Updating User</span>)
                try {
                  await updateUserMutation({
                    where: { id: user?.id },
                    data: { ...values },
                  })
                  toast.success(() => <span>Profile Settings Updated</span>, { id: toastId })
                  // router.push(Routes.Home())
                } catch (error) {
                  toast.error(error.toString())
                }
              }}
            />
          </div>
        )}
        {activeSection === 2 && (
          <div className="w-full">
            {/* <SubHeading className="mb-10 text-3xl">{subtitle}</SubHeading> */}
            <PasswordForm
              submitText="Update Password"
              schema={ChangePassword}
              onSubmit={async (values) => {
                const toastId = toast.loading(() => <span>Updating Password</span>)
                try {
                  await changePasswordMutation(values)
                  toast.success(() => <span>Password Updated</span>, { id: toastId })
                  // router.push(Routes.Home())
                } catch (error) {
                  toast.error(error.toString())
                }
              }}
            />
          </div>
        )}
      </div>
    </AuthLayout>
  )
}

Settings.suppressFirstRenderFlicker = true

export default Settings

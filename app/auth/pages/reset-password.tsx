import React from "react"
import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import { AuthForm } from "app/auth/components/AuthForm"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"
import toast from "react-hot-toast"
import { ForgotPasswordFeatureImage } from "app/assets"

import ContentBoxWithCover from "app/components/molecules/ContentBoxWithCover"
import LabeledInput from "app/components/molecules/LabeledInput"
import SubHeading from "app/components/atoms/typography/SubHeading"
import PublicLayout from "app/components/organs/layouts/Default"
import Image from "next/image"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <>
      <ContentBoxWithCover
        coverImage={{ src: ForgotPasswordFeatureImage, alt: "Reset Your Password" }}
      >
        <div className="w-full flex justify-center md:hidden">
          <Image
            src={ForgotPasswordFeatureImage}
            alt="login feature image"
            layout="fixed"
            height="240"
            width="240"
          />
        </div>
        <div className="pb-6">
          <SubHeading className="text-center lg:text-left pb-3">Reset password</SubHeading>
          <p className="text-center lg:text-left text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link href={Routes.SignupPage()} passHref>
              <a className="text-indigo-600 hover:text-indigo-900 font-medium">Signup</a>
            </Link>
          </p>
        </div>
        {isSuccess ? (
          <div>
            <h2>Password Reset Successfully</h2>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        ) : (
          <AuthForm
            submitText="Reset Password"
            schema={ResetPassword}
            initialValues={{
              password: "",
              passwordConfirmation: "",
              token: query.token as string,
            }}
            className="space-y-6"
            onSubmit={async (values) => {
              try {
                await resetPasswordMutation(values)
              } catch (error) {
                if (error.name === "ResetPasswordError") {
                  toast.error(error.message)
                } else {
                  toast.error("Sorry, we had an unexpected error. Please try again.")
                }
              }
            }}
          >
            <LabeledInput name="password" label="New Password" type="password" />
            <LabeledInput
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
          </AuthForm>
        )}
      </ContentBoxWithCover>
    </>
  )
}

ResetPasswordPage.getLayout = (page) => <PublicLayout title="Reset Password">{page}</PublicLayout>

export default ResetPasswordPage

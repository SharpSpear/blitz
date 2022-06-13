import React from "react"
import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import { AuthForm } from "app/auth/components/AuthForm"
import { ForgotPassword } from "app/auth/validations"
import toast from "react-hot-toast"
import { ForgotPasswordFeatureImage } from "app/assets"
import ContentBoxWithCover from "app/components/molecules/ContentBoxWithCover"
import forgotPassword from "../mutations/forgotPassword"
import LabeledInput from "app/components/molecules/LabeledInput"
import SubHeading from "app/components/atoms/typography/SubHeading"
import PublicLayout from "app/components/organs/layouts/Default"
import Image from "next/image"

const ForgotPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <>
      <ContentBoxWithCover
        coverImage={{ src: ForgotPasswordFeatureImage, alt: "Reset Your Password" }}
      >
        <div className="w-full flex justify-center md:hidden">
          {/* <Image
            src={ForgotPasswordFeatureImage}
            alt="login feature image"
            layout="fixed"
            height="240"
            width="240"
          /> */}
        </div>
        <div className="pb-6">
          <SubHeading className="text-center lg:text-left pb-3">Forgot Password</SubHeading>
          <p className="text-center lg:text-left text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link href={Routes.SignupPage()} passHref>
              <a className="text-indigo-600 hover:text-indigo-900 font-medium">Signup</a>
            </Link>
          </p>
        </div>
        {isSuccess ? (
          <div>
            <h2>Password Retrieval Request Submitted</h2>
          </div>
        ) : (
          <AuthForm
            submitText="Reset Password Now!"
            schema={ForgotPassword}
            initialValues={{ email: "" }}
            className="space-y-6"
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error) {
                toast.error("Sorry, we had an unexpected error. Please try again.")
              }
            }}
          >
            <LabeledInput
              name="email"
              label="Email"
              placeholder="name@mail.com"
              testid="forgotPasswordEmail"
            />{" "}
          </AuthForm>
        )}
      </ContentBoxWithCover>
    </>
  )
}

ForgotPasswordPage.getLayout = (page) => <PublicLayout title="Forgot Password">{page}</PublicLayout>

export default ForgotPasswordPage

import React, { useEffect, useState } from "react"

import { BlitzPage, useMutation, useRouterQuery } from "blitz"

import PublicLayout from "app/components/organs/layouts/Default"
import verifyEmail from "../mutations/verifyEmail"
import ContentBox from "app/components/molecules/ContentBox"
import EmailVerified from "../components/EmailVerified"

const EmailVerificationPage: BlitzPage = () => {
  const [verifyEmailMutation] = useMutation(verifyEmail)

  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null)

  const query = useRouterQuery()

  useEffect(() => {
    const token = String(query.token || "")
    if (token) {
      verifyEmailMutation({ token })
        .then(() => {
          setVerificationSuccess(true)
        })
        .catch(() => setVerificationSuccess(false))
    }
  }, [query, verifyEmailMutation])
  return (
    <div className="">
      <ContentBox className={"bg-white"}>
        {verificationSuccess === null && (
          <div className="mb-20">Processing email verification...</div>
        )}
        {verificationSuccess === true && <EmailVerified />}
        {verificationSuccess === false && (
          <div
            className="mb-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              Email verification link is invalid or it has expired.
            </span>
          </div>
        )}
      </ContentBox>
    </div>
  )
}

// EmailVerificationPage.redirectAuthenticatedTo = "/"
EmailVerificationPage.getLayout = (page) => (
  <PublicLayout title="Email Verification">{page}</PublicLayout>
)

export default EmailVerificationPage

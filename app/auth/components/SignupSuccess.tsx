import React, { useState } from "react"
import { Image, useMutation, useRouter } from "blitz"
import SubHeading from "app/components/atoms/typography/SubHeading"
import { LoginFeatureImage } from "app/assets"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import resendConfirmationEmail from "../mutations/resendConfirmationEmail"

export const SignupSuccess = ({ token }) => {
  const router = useRouter()
  const [resentConfirmation, setResentConfirmation] = useState(false)
  const [resendConfirmationEmailMutation, { isSuccess }] = useMutation(resendConfirmationEmail)
  const [processing, setProcessing] = useState(false)

  const resendConfirmation = async () => {
    setProcessing(true)
    await resendConfirmationEmailMutation({ token })
    setProcessing(false)
    setResentConfirmation(true)
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="pb-6 flex flex-col items-center content-center px-10">
        <SubHeading className="font-black text-center pb-3 text-2xl">
          A confirmation link will be sent to your email.
        </SubHeading>
        <div className="px-20 flex text-center">Please check your inbox for and verify.</div>
        <Image
          className="object-contain"
          src={LoginFeatureImage as any}
          alt={"Confirm Email"}
          layout="fixed"
        />
        <p className="px-20 flex text-center">
          <small>
            Didnt get an email? Get a new confirmation email below <br />
          </small>
        </p>
        <br />
        <ButtonPrimary disabled={processing || resentConfirmation} onClick={resendConfirmation}>
          {resentConfirmation ? "Resent confirmation email" : "Resend confirmation email"}
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SignupSuccess

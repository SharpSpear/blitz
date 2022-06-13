import React from "react"
import { Image, Routes, useRouter } from "blitz"
import SubHeading from "app/components/atoms/typography/SubHeading"
import { LoginFeatureImage } from "app/assets"

import ButtonPrimary from "app/components/atoms/Button/Primary"

export const EmailVerified = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col space-y-6">
      <div className="pb-6 flex flex-col items-center content-center px-10">
        <SubHeading className="font-black text-center pb-3 text-2xl">
          Verified! Login to get started!
        </SubHeading>
        <div className="px-20 flex text-center">
          Thank you for confirming your email address. You can now start using WhyVote.
        </div>
        <Image
          className="object-contain"
          src={LoginFeatureImage as any}
          alt={"Signed up! Login to get started!"}
          layout="fixed"
        />
        <br />
        <ButtonPrimary onClick={() => router.push(Routes.LoginPage())}>Login</ButtonPrimary>
      </div>
    </div>
  )
}

export default EmailVerified

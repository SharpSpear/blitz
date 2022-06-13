import React, { useState, useContext, useEffect, useCallback } from "react"

import { useRouter, BlitzPage, Routes, useMutation } from "blitz"
import { SignupForm } from "app/auth/components/SignupForm"

import ContentBoxWithCover from "app/components/molecules/ContentBoxWithCover"
import PublicLayout from "app/components/organs/layouts/Default"
import { LoginFeatureImage, SignupFeatureImage } from "app/assets"
import SignupSuccess from "../components/SignupSuccess"
import ContentBox from "app/components/molecules/ContentBox"

import TwitterContext, { myContext } from "./../../contexts/twitter.context"
import { IUser } from "../types/maintypes"

import signupTwitter from "app/auth/mutations/signupTwitter"

const SignupPage = ({ isModal = false }) => {
  // const userObject = useContext(myContext) as IUser
  // const [signupTwitterMutation] = useMutation(signupTwitter)

  const router = useRouter()
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [token, setToken] = useState("")

  // useEffect( () => {
  //   (async () => {
  //     if(userObject.username !== "" && userObject.name !== "" && userObject.avatar !== "") {
  //       const result = await signupTwitterMutation({
  //         username: userObject.username,
  //         name: userObject.name,
  //         avatar: userObject.avatar,
  //       })
  //       localStorage.setItem("rememberMe", "")
  //       localStorage.setItem("token", "")
  //       localStorage.setItem("username", "")
  //       window.location.href = "/"

  //     }
  //   })()
  // }, [userObject.username, userObject.name, userObject.avatar])

  return (
    <>
      {!signupSuccess && (
        <ContentBoxWithCover coverImage={{ src: LoginFeatureImage, alt: "Signup Feature" }}>
          <SignupForm
            onSuccess={({ token }) => {
              setToken(token)
              setSignupSuccess(true)
            }}
          />
        </ContentBoxWithCover>
      )}
      {signupSuccess && (
        <ContentBox className={isModal ? "bg-active" : "bg-white"}>
          <SignupSuccess token={token} />
        </ContentBox>
      )}
    </>
  )
}

// SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <PublicLayout title="Sign Up">{page}</PublicLayout>

export default SignupPage

import React from "react"
import { Router, Routes, useMutation, Link, useRouter } from "blitz"
import { AuthForm } from "app/auth/components/AuthForm"
import signup from "app/auth/mutations/signup"
import signupFacebook from "app/auth/mutations/signupFacebook"
import { Signup } from "app/auth/validations"
import LabeledInput from "app/components/molecules/LabeledInput"
import LabeledCheckbox from "app/components/molecules/LabeledCheckbox"
import { useState } from "react"
import ButtonTwitter from "app/components/atoms/Button/Twitter"
import SubHeading from "app/components/atoms/typography/SubHeading"

import { TWITTER_AUTH_SERVER } from "./../../contexts/constant"

import FacebookLogin from "react-facebook-login"

type SignupFormProps = {
  onSuccess?: (data) => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [signupFacebookMutation] = useMutation(signupFacebook)

  const [emailError, setEmailError] = useState("")
  const router = useRouter()

  const onLogin = (e) => {
    router.push(Routes.LoginPage()).then(() => {
      router.reload()
    })
  }

  const responseFacebook = (response) => {
    ;(async () => {
      if (response) {
        const result = await signupFacebookMutation({
          name: response.name,
          email: response.email,
        })
        localStorage.setItem("rememberMe", "")
        localStorage.setItem("token", "")
        localStorage.setItem("username", "")
        window.location.href = "/"
      }
    })()
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="pb-6">
        <SubHeading className="text-center lg:text-left pb-3">Сreate an account</SubHeading>
        <p className="text-gray-400 text-sm text-center lg:text-left">
          Already have an account?{" "}
          <a onClick={onLogin} className="text-green-600 hover:text-green-900 font-medium">
            Login
          </a>
        </p>
      </div>
      <AuthForm
        testid="signupForm"
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          setEmailError("")
          try {
            const termsAgreement = values["termsAgreement"] ? true : false
            const formData = { ...values, termsAgreement }
            // console.log(formData)
            const result = await signupMutation(formData)
            // console.log(formData, result)
            props.onSuccess?.(result)
          } catch (error) {
            if (error.toString().match(/email/gi)) {
              setEmailError("This email address is already in use")
            }
            // if (error.code === "P2002" && error.meta?.target?.match("email")) {
            //   // This error comes from Prisma
            //   toast.error("This email is already being used")
            // } else {
            //   toast.error(error.toString())
            // }
          }
        }}
      >
        <div className="lg:flex lg:gap-x-4">
          <div className="w-full mb-4 lg:w-1/2 lg:mb-0">
            <LabeledInput
              name="firstName"
              label="First Name"
              placeholder="Minimum 3 letters"
              testid="signupFirstName"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <LabeledInput
              name="lastName"
              label="Last Name"
              placeholder="Minimum 3 letters"
              testid="signupLastName"
            />
          </div>
        </div>

        <LabeledInput
          name="email"
          label="Email"
          placeholder="name@mail.com"
          testid="signupEmail"
          error={emailError}
        />

        <LabeledInput
          name="password"
          label="Password"
          placeholder="8+ characters, one capital letter"
          type="password"
          testid="signupPassword"
          autoFocus={false}
          autoComplete={"off"}
        />
        <div className="flex pt-4">
          <LabeledCheckbox
            name="termsAgreement"
            label={
              <>
                I agree to WhyVote’s Link{" "}
                <a className="text-green-600" href="/terms-of-service">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-green-600" href="/privacy-policy">
                  Privacy Policy
                </a>
              </>
            }
            value={"true"}
          />
        </div>
      </AuthForm>
      {/* <p className="text-center">or if you have build in public on Twitter already</p>
      <button
        className="border-button border inline-block p-2 px-5"
        onClick={() => {
          window.location.href = `${TWITTER_AUTH_SERVER}/auth/twitter`
        }}
      >
        Claim Twitter Account Profile
      </button> */}

      <p className="text-center">or</p>
      <FacebookLogin
        appId="620626792306098" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
        textButton="Login via Facebook"
        cssClass="border border-[#1bcd90] inline-block p-2 px-5 text-[#1bcd90] cursor-pointer w-full"
      />
    </div>
  )
}

export default SignupForm

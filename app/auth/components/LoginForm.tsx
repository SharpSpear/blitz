import { Routes, useMutation, Link, useRouter } from "blitz"
import { AuthForm } from "app/auth/components/AuthForm"
import login from "app/auth/mutations/login"
import loginFacebook from "app/auth/mutations/loginFacebook"
import { Login } from "app/auth/validations"
import React, { useState } from "react"
import LabeledInput from "app/components/molecules/LabeledInput"
import LabeledCheckbox from "app/components/molecules/LabeledCheckbox"
import SubHeading from "app/components/atoms/typography/SubHeading"
import { LoginFeatureImage } from "app/assets"
import Image from "next/image"
//import FacebookLogin from "react-facebook-login"
import { useGoogleLogin, GoogleLogin } from "react-google-login"
import ButtonPrimary from "app/components/atoms/Button/Primary"

// import { TWITTER_AUTH_SERVER } from "./../../contexts/constant"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const clientId = "440522983342-og9i0ssf641ccjocjepb7q9a9aref9n9.apps.googleusercontent.com"

  const onSuccess = (res) => {
    console.log("current User =>", res.profileObj)
  }

  const onFailure = (res) => {
    console.log("login Failure =>", res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    //isSignedIn: true,
    accessType: "offline",
    cookiePolicy: "single_host_origin",
  })

  const [loginMutation] = useMutation(login)
  const [loginFacebookMutation] = useMutation(loginFacebook)

  const [error, setError] = useState("")
  const router = useRouter()

  const onSignup = (e) => {
    router.push(Routes.SignupPage()).then(() => {
      router.reload()
    })
  }

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false
  const username = localStorage.getItem("username") || ""

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full flex justify-center md:hidden">
        <Image
          src={LoginFeatureImage}
          alt="login feature image"
          layout="fixed"
          height="240"
          width="240"
        />
      </div>
      <div className="pb-6">
        <SubHeading className="text-center lg:text-left pb-3">Log in to WhyVote</SubHeading>
        <p className="text-gray-400 text-sm text-center lg:text-left">
          Don’t have an account?{" "}
          <a onClick={onSignup} className="text-green-600 hover:text-green-900 font-medium">
            Signup
          </a>
        </p>
      </div>
      <AuthForm
        testid="loginForm"
        submitText="Login"
        schema={Login}
        initialValues={{ email: username, password: "" }}
        onSubmit={async (values) => {
          try {
            const resp = await loginMutation(values)
            if (values["rememberMe"] === "true") {
              localStorage.setItem("rememberMe", "true")
              localStorage.setItem("username", values["email"])
              localStorage.setItem("token", resp?.["accessToken"])
            } else {
              localStorage.setItem("rememberMe", "")
              localStorage.setItem("token", "")
              localStorage.setItem("username", "")
            }
            props.onSuccess?.()
          } catch (error) {
            const erroMsg = error.toString().split(":").pop()
            setError("Incorrect username or password.")
          }
        }}
      >
        {error && <span className="text-red-500 text-xs">{error}</span>}
        <LabeledInput name="email" label="Email" placeholder="name@mail.com" testid="signupEmail" />
        <LabeledInput
          name="password"
          label="Password"
          placeholder="8+ characters, one capital letter"
          type="password"
          testid="signupPassword"
        />
        <div className="flex">
          <div className="w-1/2 ">
            <LabeledCheckbox
              name="rememberMe"
              label={<>Remember me</>}
              value={"true"}
              defaultChecked={rememberMeChecked}
            />
          </div>
          <div className="w-1/2 text-right">
            <Link href={Routes.ForgotPasswordPage()} passHref>
              <a className="text-[#1bcd90]">Forgot your passsword?</a>
            </Link>
          </div>
        </div>
      </AuthForm>
      <p className="text-center">or</p>
      <ButtonPrimary className="border-button border inline-block p-2 px-5" onClick={signIn}>
        <div className="flex justify-center">
          <svg width="18" height="18" className="mt-1">
            <g fill="#000" fillRule="evenodd">
              <path
                d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                fill="#EA4335"
              ></path>
              <path
                d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                fill="#4285F4"
              ></path>
              <path
                d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                fill="#FBBC05"
              ></path>
              <path
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                fill="#34A853"
              ></path>
              <path fill="none" d="M0 0h18v18H0z"></path>
            </g>
          </svg>
          <span className="buttonText px-2">Login With Google</span>
        </div>
      </ButtonPrimary>
    </div>
  )
}

export default LoginForm

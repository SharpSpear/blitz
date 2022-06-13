import React, { useState } from "react"
import SignupPage from "app/auth/pages/signup"
import ModalDialog from "../../../molecules/ModalDialog"
import LoginPage from "app/auth/pages/login"

const SignDialog = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div className="flex justify-center pt-[120px]">
      <div className="px-5 py-3 rounded-lg mt-4 flex w-[95%] lg:w-[60%] flex-col lg:flex-row space-x-4 space-y-3 justify-around items-center shadow-lg ">
        <div className="">
          <p className="font-Opensans-SemiBold text-center lg:text-left text-[20px] lg:text-[28px] leading-[27px]">
            New to Whyvote?
          </p>
          <p
            className="font-Opensans mt-[5px] text-center lg:text-left"
            style={{ fontSize: "14px", lineHeight: "19px" }}
          >
            Joining is free! Create an account today!
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="w-[130px] h-[30px] btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-green-700 hover:bg-green-700 text-black hover:text-white font-normal px-4 "
            onClick={(e) => {
              e.preventDefault()
              setShowSignup(true)
            }}
          >
            Sign Up
          </button>
          <button
            className="w-[130px] h-[30px] btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-900 text-white font-normal  px-4 ml-3 "
            onClick={(e) => {
              e.preventDefault()
              setShowLogin(true)
            }}
          >
            Log In
          </button>
        </div>
      </div>
      <ModalDialog open={showSignup} onClose={() => setShowSignup(false)}>
        <SignupPage />
      </ModalDialog>

      <ModalDialog open={showLogin} onClose={() => setShowLogin(false)}>
        <LoginPage />
      </ModalDialog>
    </div>
  )
}

export default SignDialog

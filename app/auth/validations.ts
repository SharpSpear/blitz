import { emailRule, firstNameRule, lastNameRule, passwordRule } from "app/users/validations"
import { z } from "zod"

export const Signup = z.object({
  firstName: firstNameRule,
  lastName: lastNameRule,
  email: emailRule,
  password: passwordRule,
  termsAgreement: z.any().refine(
    (val) => {
      return val !== false
    },
    {
      message: "Should accept the terms and privacy policy",
    }
  ),
})

export const Login = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().nonempty("Please enter your password"),
  rememberMe: z.any().nullable().optional(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const EmailVerification = z.object({
  token: z.string(),
})

export const ResetPassword = z
  .object({
    password: passwordRule,
    passwordConfirmation: passwordRule,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordRule,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

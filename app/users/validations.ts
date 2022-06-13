import { z } from "zod"

export const firstNameRule = z
  .string()
  .nonempty("The field cannot be empty")
  .min(3, "Minimum of 3 letters")
export const lastNameRule = z
  .string()
  .nonempty("The field cannot be empty")
  .min(3, "Minimum of 3 letters")
export const emailRule = z
  .string()
  .nonempty("The field cannot be empty")
  .email("Wrong email format")

export const passwordRule = z.string().refine(
  (val) => {
    if (!val) return true
    return val?.length >= 8 && val.match(/[A-Za-z]/)
  },
  () => ({
    message: `Should be at least 8 characters with at least one capitalized`,
  })
)

export const ChangePassword = z
  .object({
    password: passwordRule.optional(),
    passwordConfirmation: passwordRule.optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.passwordConfirmation) {
        return data.password === data.passwordConfirmation
      }

      return true
    },
    {
      message: "Passwords don't match",
      path: ["passwordConfirmation"], // set the path of the error
    }
  )

export const UserSettings = z.object({
  firstName: firstNameRule,
  lastName: lastNameRule,
  email: emailRule,
  twitter: z.string().optional().nullable(),
})

export type UserSettingsInputType = z.infer<typeof UserSettings>

export const UserAvatar = z.object({
  avatarId: z.string().nullable(),
})

export type UserAvatarInputType = z.infer<typeof UserAvatar>

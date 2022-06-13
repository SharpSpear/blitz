import React from "react"
import LabeledInput from "app/components/molecules/LabeledInput"

import Form, { FormProps } from "app/components/molecules/Form"
import { z } from "zod"

export function PasswordForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <>
      <Form<S> {...props}>
        <div className="flex justify-center overflow-hidden sm:-mx-3 md:-mx-2 lg:-mx-5 xl:-mx-8 lg:px-10">
          <div className="flex flex-col gap-y-8 w-full overflow-hidden sm:my-3 sm:px-3 sm:w-full md:my-2 md:px-2 md:w-full lg:my-5 lg:px-5 lg:w-1/2 xl:my-8 xl:px-8 xl:w-1/2">
            <LabeledInput
              name="currentPassword"
              label="Current Password"
              placeholder="8+ characters, one capital letter"
              type="password"
              testid="currentPassword"
              autoFocus={false}
              autoComplete={"off"}
            />
            <LabeledInput
              name="newPassword"
              label="New Password"
              placeholder="8+ characters, one capital letter"
              type="password"
              testid="newPassword"
              autoFocus={false}
              autoComplete={"off"}
            />
            <LabeledInput
              name="passwordConfirmation"
              label="Confirm Password"
              placeholder="8+ characters, one capital letter"
              type="password"
              testid="passwordConfirmation"
              autoFocus={false}
              autoComplete={"off"}
            />
          </div>
        </div>
      </Form>
    </>
  )
}

export default PasswordForm

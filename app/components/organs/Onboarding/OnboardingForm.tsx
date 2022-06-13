import { ReactNode, PropsWithoutRef, useEffect } from "react"
import { FormProvider, useForm, UseFormProps, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import ButtonOutlined from "app/components/atoms/Button/Outlined"

import { useUI } from "app/contexts/ui.context"
import { isEmpty } from "lodash"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
  testid?: string
  user?: any
  projects?: any
  cancelText?: string
  onCancel?: () => any
  redirectToStep: (number: number) => any
}

interface OnSubmitResult {
  [prop: string]: any
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  cancelText,
  onCancel,
  redirectToStep,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "all",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
    reValidateMode: "onBlur",
  })

  const onInvalidHandler = (errors) => {
    const errorsArray = Object.keys(errors)

    if (errorsArray.includes("name") || errorsArray.includes("slug")) {
      redirectToStep(1)
      return
    }

    if (errorsArray.includes("url")) {
      redirectToStep(2)
      return
    }
  }

  return (
    <FormProvider {...ctx}>
      <form
        data-testid={`${props.testid && `${props.testid}-`}form`}
        onSubmit={ctx.handleSubmit(onSubmit, onInvalidHandler)}
        className="form space-y-5"
        {...props}
      >
        <div className="lg:mt-6">
          {/* Form fields supplied as children are rendered here */}
          {children}
        </div>
      </form>
    </FormProvider>
  )
}

export default Form

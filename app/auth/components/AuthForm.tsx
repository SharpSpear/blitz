import { ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import ButtonPrimary from "app/components/atoms/Button/Primary"

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
}

interface OnSubmitResult {
  [prop: string]: any
}

export function AuthForm<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })

  return (
    <FormProvider {...ctx}>
      <form
        data-testid={`${props.testid && `${props.testid}-`}form`}
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}

          for (const [key, value] of Object.entries(result)) {
            ctx.setError(key as any, {
              type: "submit",
              message: value,
            })
          }
        })}
        className="form space-y-5"
        {...props}
      >
        {/* Form fields supplied as children are rendered here */}
        {children}

        {submitText && (
          <div className="pt-6">
            <ButtonPrimary
              type="submit"
              disabled={ctx.formState.isSubmitting}
              data-testid={`${props.testid && `${props.testid}-`}submitButton`}
              className="w-full"
            >
              {submitText}
            </ButtonPrimary>
          </div>
        )}
      </form>
    </FormProvider>
  )
}

export default AuthForm

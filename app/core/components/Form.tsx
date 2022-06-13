import { ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import { ExtendedUser } from "types"

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
  header?: string
  subHeader?: string
  user?: ExtendedUser | null
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
  header,
  subHeader,
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
        <div className="bg-white py-6 px-4 sm:p-6 rounded-lg">
          <div>
            {(header || subHeader) && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">{header}</h2>
                <p className="mt-1 text-sm text-gray-500">{subHeader}</p>
              </div>
            )}
            <div className="mt-6">
              {/* Form fields supplied as children are rendered here */}
              {children}
            </div>
            <div className="mt-4 text-right">
              {submitText && (
                <button
                  type="submit"
                  disabled={ctx.formState.isSubmitting}
                  data-testid={`${props.testid && `${props.testid}-`}submitButton`}
                  className="text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700"
                >
                  {submitText}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default Form

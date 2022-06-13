import { ReactNode, PropsWithoutRef } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import ButtonOutlined from "app/components/atoms/Button/Outlined"

import styles from "./Form.module.scss"
import { useUI } from "app/contexts/ui.context"

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
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })

  const { isProcessing } = useUI()
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
        className="form space-y-5 w-full"
        {...props}
      >
        <div className="bg-white px-10 py-5 rounded-lg xl:px-20 xl:py-10">
          <div>
            <div className="lg:mt-6">
              {/* Form fields supplied as children are rendered here */}
              {children}
            </div>
            <div className="lg:mb-6 mt-4 flex justify-center flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              {submitText && (
                <ButtonPrimary
                  type="submit"
                  disabled={isProcessing || ctx.formState.isSubmitting}
                  data-testid={`${props.testid && `${props.testid}-`}submitButton`}
                  className={styles.submitButton + " disabled:opacity-50 w-80 h-16"}
                >
                  {submitText}
                </ButtonPrimary>
              )}
              {cancelText && (
                <ButtonOutlined
                  type="button"
                  onClick={onCancel}
                  disabled={isProcessing || ctx.formState.isSubmitting}
                  className={styles.submitButton + " w-80 h-16"}
                >
                  {cancelText}
                </ButtonOutlined>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default Form

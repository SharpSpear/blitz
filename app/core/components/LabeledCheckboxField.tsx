import { ReactNode, forwardRef, PropsWithoutRef, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"

export interface LabeledCheckboxFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactNode
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string
}

export const LabeledCheckboxField = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    useMemo(() => {
      const error = Array.isArray(errors[name])
        ? errors[name].join(", ")
        : errors[name]?.message || errors[name]

      error &&
        toast.error(`${name.charAt(0).toUpperCase() + name.slice(1)}: ${error}`, {
          id: errors[name],
        })
    }, [errors, name])

    return (
      <div {...outerProps}>
        <label
          data-testid={`${props.testid && `${props.testid}-`}label`}
          className="flex items-center text-sm font-medium text-gray-700"
        >
          <input
            type="checkbox"
            disabled={isSubmitting}
            {...register(`${name}` as const)}
            {...props}
            data-testid={`${props.testid && `${props.testid}-`}input`}
            className="form-checkbox"
          />
          <span className="ml-2 text-sm">{label}</span>
        </label>
      </div>
    )
  }
)

export default LabeledCheckboxField

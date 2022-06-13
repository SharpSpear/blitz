import { ReactNode, forwardRef, PropsWithoutRef, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledCheckboxFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactNode
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string

  labelclassname?: string
}

export const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxFieldProps>(
  ({ label, outerProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()

    const [error, setError] = useState("")

    useMemo(() => {
      const error = Array.isArray(errors[name])
        ? errors[name].join(", ")
        : errors[name]?.message || errors[name]

      setError(error)
    }, [errors, name])

    return (
      <div {...outerProps}>
        {error && <span className="text-red-500	text-xs">{error}</span>}
        <label
          data-testid={`${props.testid && `${props.testid}-`}label`}
          className={props.labelclassname + " flex items-center text-sm font-medium text-gray-700"}
        >
          <input
            type="checkbox"
            disabled={isSubmitting}
            {...register(`${name}` as const)}
            {...props}
            data-testid={`${props.testid && `${props.testid}-`}input`}
            className="form-checkbox !bg-[#1bbd90]"
          />
          <span className="ml-2 text-sm">{label}</span>
        </label>
      </div>
    )
  }
)

export default LabeledCheckbox

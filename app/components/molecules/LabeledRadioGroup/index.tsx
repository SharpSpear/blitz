import { ReactNode, forwardRef, PropsWithoutRef, useMemo, useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

import styles from "./styles.module.scss"
import { isEqual } from "lodash"

export interface SelectOption {
  value: any
  text?: string
  onSelect?: () => {}
}

export interface LabeledRadioGroupFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactNode
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string

  options: SelectOption[]

  labelclassname?: string
}

export const LabeledRadioGroup = ({
  label,
  outerProps,
  name,
  options,
  defaultValue,
  ...props
}: LabeledRadioGroupFieldProps) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext() || { formState: { isSubmitting: false, errors: {} } }

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SelectOption>()

  const [error, setError] = useState("")

  useEffect(() => {
    setSelected({ value: defaultValue })
  }, [defaultValue])

  useMemo(() => {
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    setError(error)
  }, [errors, name])

  const handleChange = (e) => {
    setSelected({ value: e.target?.value })
  }

  return (
    <div {...outerProps} className={styles.labeledRadioGroup + ""}>
      {error && <span className="text-red-500	text-xs">{error}</span>}
      {label && <span className="text-gray-700">{label}</span>}
      {!label && <span className="hidden lg:flex text-gray-700">&nbsp;</span>}
      <div className="flex justify-start">
        {options.map(({ value, text }: SelectOption, i) => {
          return (
            <label
              data-testid={`${props.testid && `${props.testid}-`}label`}
              // className={styles.label + " inline-flex items-center mt-5"}
              className={`${styles.label} ${
                props.disabled ? "opacity-50" : ""
              } inline-flex items-center mt-5`}
              key={i}
            >
              <input
                type="radio"
                disabled={isSubmitting}
                {...register(`${name}` as const)}
                {...props}
                data-testid={`${props.testid && `${props.testid}-`}input`}
                className={styles.formRadio}
                onChange={handleChange}
                value={value}
                checked={isEqual(String(selected?.value), String(value)) ? true : false}
              />
              <span className="ml-4">{text}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default LabeledRadioGroup

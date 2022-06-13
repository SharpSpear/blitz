import { useEffect } from "react"
import { forwardRef, PropsWithoutRef, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import slugify from "slugify"

import { Image } from "blitz"

import styles from "./LabeledInput.module.scss"
import { CircleCheckIcon } from "app/assets"

export interface LabeledInputFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string
  error?: string

  labelclassname?: string
  prefix?: string
  copyTarget?: string
}

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputFieldProps>(
  ({ label, outerProps, name, error = "", copyTarget, ...props }, ref) => {
    const {
      setValue,
      register,
      setError,
      formState: { isSubmitting, errors },
      clearErrors,
    } = useFormContext()

    const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState<boolean | undefined>()

    useEffect(() => {
      if (error) {
        setErrorMsg(error)
      }
    }, [error])

    useMemo(() => {
      const error = Array.isArray(errors[name])
        ? errors[name].join(", ")
        : errors[name]?.message || errors[name]

      // if (errorMsg && !error) {
      //   setSuccess(true)
      // } else {
      //   setSuccess(false);
      // }
      setErrorMsg(error)
    }, [errors, name])

    let rightIcon = ""
    let inputClassName = errorMsg ? styles.inputError : success ? styles.inputSuccess : ""
    if (inputClassName == styles.inputError) {
      rightIcon = "/svg-icons/circle-close.svg"
    } else if (inputClassName == styles.inputSuccess) {
      rightIcon = CircleCheckIcon
    }

    const handleChange = (e) => {
      setValue(name, e.target?.value)

      if (copyTarget) {
        setValue(copyTarget, slugify(e.target.value.toLowerCase()))
        clearErrors()
      }

      setErrorMsg("")
      props.onChange?.(e)
    }
    const className = styles.labeledInput + " " + (props.className || "")
    return (
      <div {...outerProps} className={className}>
        <label
          data-testid={`${props.testid && `${props.testid}-`}label`}
          className={props.labelclassname + " text-sm font-medium text-gray-700"}
        >
          <span className="leading-8 float-left">{label}</span>
          {errorMsg && (
            <span className="text-red-500 	leading-8 text-xs float-right">{errorMsg}</span>
          )}
        </label>

        <div className="mt-1 relative flex w-full rounded-md shadow-sm">
          {props.prefix && (
            <span
              className={
                styles.prefix +
                " inline-flex px-5 items-center rounded-1-md border  border-gray-300"
              }
            >
              {props.prefix}
            </span>
          )}
          <input
            disabled={isSubmitting}
            {...register(`${name}` as const)}
            {...props}
            data-testid={`${props.testid && `${props.testid}-`}input`}
            className={inputClassName + " w-full sm:text-sm rounded"}
            onChange={handleChange}
          />

          {rightIcon && (
            <span className="right-4 top-1 z-10 h-full leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <Image className={""} alt="" src={rightIcon} width={20} height={20} />
            </span>
          )}
        </div>
      </div>
    )
  }
)

export default LabeledInput

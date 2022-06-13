import { useCallback, useEffect } from "react"
import { forwardRef, PropsWithoutRef, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Plan } from "db"

import { Image } from "blitz"

import styles from "./LabeledTextArea.module.scss"
import { CircleCheckIcon } from "app/assets"

export interface LabeledTextAreaFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string
  error?: string

  prefix?: string

  rows?: number
  copyTarget?: string
  copyTargetText?: string
  userPlan?: Plan
}

export const LabeledTextArea = forwardRef<HTMLInputElement, LabeledTextAreaFieldProps>(
  (
    { label, outerProps, name, error = "", rows, copyTarget, copyTargetText, userPlan, ...props },
    ref
  ) => {
    const {
      setValue,
      getValues,
      register,
      formState: { isSubmitting, errors },
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

    let inputClassName = errorMsg ? styles.inputError : success ? styles.inputSuccess : ""

    const handleChange = (e) => {
      setErrorMsg("")
      props.onChange?.(e)
    }

    const handleCopyToTarget = () => {
      setValue(copyTarget as string, getValues(name))
    }

    return (
      <div {...outerProps} className={styles.labeledInput}>
        <label
          data-testid={`${props.testid && `${props.testid}-`}label`}
          className="text-sm font-medium text-gray-700"
        >
          <span className="leading-8  font-Opensans-SemiBold text-[16px]  float-left">{label}</span>
          {errorMsg && (
            <span className="text-red-500 	leading-8 text-xs float-right">{errorMsg}</span>
          )}
        </label>

        <div className="mt-1 relative flex w-full flex-wrap items-stretch rounded-md shadow-sm">
          {props.prefix && (
            <span
              className={
                inputClassName + " inline-flex items-center rounded-1-md border-0 border-gray-300"
              }
            >
              {props.prefix}
            </span>
          )}
          <textarea
            disabled={isSubmitting}
            {...register(`${name}` as const)}
            {...props}
            data-testid={`${props.testid && `${props.testid}-`}input`}
            className={`${inputClassName} w-full sm:text-sm rounded`}
            onChange={handleChange}
            rows={rows || 5}
          />
          {/* 
          {userPlan === Plan.FREE && (
            <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full">
              <p className="text-lg font-bold text-gray-400 text-center">
                Private records are available starting with our Startup Plan
              </p>
            </span>
          )} */}

          {copyTarget && (
            <span className="absolute -bottom-8 right-3">
              <button
                disabled={props.disabled}
                type="button"
                onClick={handleCopyToTarget}
                className="py-1 px-3 text-xs text-white bg-primary"
              >
                {copyTargetText || `Copy to ${copyTarget}`}
              </button>
            </span>
          )}
        </div>
      </div>
    )
  }
)

export default LabeledTextArea

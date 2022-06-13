import { ReactNode, forwardRef, PropsWithoutRef, useMemo, useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { TriangleDownIcon } from "app/assets"
import { CheckIcon } from "@radix-ui/react-icons"
import styles from "./LabeledCalendar.module.scss"
import { find, isEmpty, isSet } from "lodash"
import moment from "moment"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export interface LabeledCalendarFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactNode
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string

  labelclassname?: string

  defaultValue?: string

  contentWidth?: string

  placeholder?: string
}

export const LabeledCalendar = ({
  label,
  outerProps,
  name,
  defaultValue,
  contentWidth,
  placeholder,
  ...props
}: LabeledCalendarFieldProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useFormContext() || { formState: { isSubmitting: false, errors: {} } }

  const [open, setOpen] = useState(false)
  // const [selected, setSelected] = useState<SelectOption | undefined>()

  const [dateValue, setDateValue] = useState(defaultValue || new Date())

  const [error, setError] = useState("")

  useEffect(() => {
    register?.(name)
  }, [name, register])

  // useMemo(() => {
  //   const error = Array.isArray(errors[name])
  //     ? errors[name].join(", ")
  //     : errors[name]?.message || errors[name]

  //   setError(error)
  // }, [errors, name])

  const handleCalendarChange = (value) => {
    setDateValue(value)
    setValue(name, value)
    setOpen(false)
  }

  return (
    <div {...outerProps} className={styles.labeledSelect}>
      {error && <span className="text-red-500	text-xs">{error}</span>}
      <span className="mb-4 block font-Opensans-SemiBold text-[16px]  text-gray-700">
        {label ? label : ""}&nbsp;
      </span>
      <label
        data-testid={`${props.testid && `${props.testid}-`}label`}
        className={props.labelclassname + " flex items-center text-sm font-medium text-gray-700"}
      >
        <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger>
            <div
              className={`${styles.selectbtn} px-2 py-3 pr-4 font-bold text-sm flex items-center rounded w-max`}
            >
              <p className="w-full px-3 flex justify-start21">{moment(dateValue).format("LL")}</p>
              <Image
                src={TriangleDownIcon}
                alt="prospect-icon"
                layout="fixed"
                width="12"
                height="12"
              />
            </div>
          </DropdownMenu.Trigger>
          {/* 3 */}
          <DropdownMenu.Content
            align={"center"}
            className={`min-w-full w-[350px] bg-white p-1 shadow-md rounded ${contentWidth}`}
          >
            <Calendar onChange={handleCalendarChange} value={dateValue} />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </label>
    </div>
  )
}

export default LabeledCalendar

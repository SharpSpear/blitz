import { ReactNode, PropsWithoutRef, useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { TriangleDownIcon } from "app/assets"
import { CheckIcon } from "@radix-ui/react-icons"

import styles from "./LabeledSelect.module.scss"
import { find } from "lodash"

export interface SelectOption {
  value: any
  text: string
  icon?: any
  onSelect?: () => {}
}

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string | ReactNode
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  testid?: string

  options: SelectOption[]

  labelclassname?: string

  defaultValue?: string

  align?: "center" | "start" | "end"

  contentWidth?: string

  placeholder?: string
}

export const LabeledSelect = ({
  label,
  outerProps,
  name,
  options,
  defaultValue,
  align,
  contentWidth,
  placeholder,
  ...props
}: LabeledSelectFieldProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useFormContext() || { formState: { isSubmitting: false, errors: {} } }

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SelectOption | undefined>()

  const [error, setError] = useState("")

  useEffect(() => {
    register?.(name)
  }, [name, register])

  useEffect(() => {
    if (errors[name]) {
      setError(errors[name].message)
    }
  }, [errors, setError, name])

  // useMemo(() => {
  //   const error = Array.isArray(errors[name])
  //     ? errors[name].join(", ")
  //     : errors[name]?.message || errors[name]

  //   setError(error)
  // }, [errors, name])

  useEffect(() => {
    const values = getValues?.() || []
    let value = defaultValue

    if (typeof values[name] !== "undefined") {
      value = values[name]
    }
    setSelected(find(options, { value }))
  }, [getValues, name, options, defaultValue])

  return (
    <div {...outerProps} className={styles.labeledSelect}>
      {label && (
        <span className="mb-4 block font-Opensans-SemiBold text-[16px] text-gray-700">{label}</span>
      )}
      <label
        data-testid={`${props.testid && `${props.testid}-`}label`}
        className={props.labelclassname + " flex items-center text-sm font-medium text-gray-700"}
      >
        <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger>
            <div
              className={`${styles.selectbtn} ${
                error && "border-red-600 border-2"
              } px-2 py-3 pr-4 font-bold text-sm flex items-center rounded w-max`}
            >
              {selected?.icon && (
                <div className="mr-6 flex">
                  <Image src={selected?.icon} alt={selected?.text} width="36" height="36" />
                </div>
              )}
              {selected?.text ? (
                <p className="w-full flex justify-start21">{selected?.text}</p>
              ) : (
                <p className="w-full flex justify-start21">{placeholder}</p>
              )}
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
            align={align ? align : "end"}
            className={`min-w-full bg-white text-white p-1 shadow-md rounded ${
              contentWidth || "w-36"
            }`}
          >
            {options.map((item, i) => {
              return (
                <DropdownMenu.Item
                  key={i}
                  data-testid={`${item.text}-navLink`}
                  as={"button"}
                  onSelect={() => {
                    setSelected(item)
                    setValue?.(name, item.value)
                    item.onSelect?.()
                    setError("")
                  }}
                  className={`flex ${
                    item.icon ? "justify-start" : "justify-between"
                  } items-center	text-left cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:text-gray-500 hover:bg-active focus:outline-none focus-visible:text-gray-500 w-full`}
                >
                  {item.icon && (
                    <div className="mr-6 flex">
                      <Image src={item.icon} alt={item.text} width="36" height="36" />
                    </div>
                  )}
                  {item.text}
                  <DropdownMenu.ItemIndicator>
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </label>
      {error && <span className="text-red-500	text-xs">{error}</span>}
    </div>
  )
}

export default LabeledSelect

import React, { FC, Fragment, useEffect, useState } from "react"
import { Image } from "blitz"
import { BlueEditIcon, CircleCheckIcon } from "app/assets"
import LabeledInput from "../LabeledInput"

interface Props {
  type: string
  item: Record<any, any>
  handleSave?: (item) => Promise<void>
  handleCancel?: (item) => void
}

/**
 * @author Roel Abasa
 * @function EditableItem
 **/

const EditableItem: FC<Props> = ({ type, item, ...props }) => {
  const [data, setData] = useState<Record<any, any>>()
  const [mode, setMode] = useState("view")

  useEffect(() => {
    setData({ ...item })
    if (item.mode) {
      setMode(item.mode)
    }
  }, [item])

  const handleChange = (e) => {
    setData({ ...data, name: e.target?.value })
  }

  const onSave = async () => {
    await props.handleSave?.({ ...data })
    setMode("view")
  }

  const onCancelEdit = () => {
    props.handleCancel?.(item)
    setMode("view")
  }

  return (
    <Fragment key={item.id}>
      {mode === "view" && (
        <div className="flex justify-between bg-active p-3.5">
          <div className="pl-1">{data?.name}</div>
          <button type="button" onClick={() => setMode("edit")}>
            <Image
              className="mx-2"
              src={BlueEditIcon}
              width="16"
              height="16"
              alt="Edit Workspace"
            />
          </button>
        </div>
      )}
      {mode === "edit" && (
        <div className="flex justify-between bg-active pr-2 mb-1">
          <LabeledInput
            key={item.key}
            name={type + " " + item.key}
            label=""
            placeholder={item.id ? "Edit Workspace" : "Add Workspace"}
            type="text"
            autoFocus={false}
            autoComplete={"off"}
            defaultValue={data?.name}
            className="w-full"
            onChange={handleChange}
          />
          <div className="flex">
            <button type="button" onClick={onCancelEdit} className="pl-1">
              <Image
                className="mx-4"
                src={"/svg-icons/circle-close.svg"}
                width="26"
                height="26"
                alt="Cancel"
              />
            </button>{" "}
            &nbsp;
            <button type="button" onClick={onSave}>
              <Image
                className="mx-4"
                src={CircleCheckIcon}
                width="26"
                height="26"
                alt={"Save Workspace"}
              />
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}
export default EditableItem

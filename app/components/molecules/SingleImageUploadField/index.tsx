import React, { PropsWithoutRef, useEffect, useState } from "react"
import { useFormContext, Controller } from "react-hook-form"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import { TrashIcon } from "@heroicons/react/outline"
import { getSignedUrl } from "app/core/utils/s3"
import { FileUpload } from "db"
import ConfirmationModal from "../ConfirmationModal"

import { Image } from "blitz"
import { BlueDeleteIcon } from "app/assets"
import { useUI } from "app/contexts/ui.context"
import toast from "react-hot-toast"

export interface SingleImageUploadProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>

  // custom props
  onUploadSuccess?: (data) => void
  onDeleteSuccess?: () => void

  userId?: number | null
  width?: number
  height?: number
  defaultImage?: FileUpload | null
}

export const SingleImageUploadField = React.forwardRef<HTMLInputElement, SingleImageUploadProps>(
  (
    {
      label,
      outerProps,
      defaultValue,
      userId,
      width,
      height,
      onDeleteSuccess,
      onUploadSuccess,
      defaultImage,
      ...props
    },
    ref
  ) => {
    const { setValue, watch } = useFormContext()

    const { isProcessing, setProcessing } = useUI()

    const [imageUrl, setImageUrl] = useState("")
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const file: { path: string } = watch(`${props.name}` as const)

    const onDrop = React.useCallback(
      async (droppedFiles) => {
        const resp = await fileUpload(props.name, droppedFiles[0])
        if (resp?.status === 201) {
          setValue(`${props.name}` as const, resp.data, { shouldValidate: true })
          onUploadSuccess?.(resp.data)
          toast.success(() => <span>Upload Success</span>)
        } else {
          toast.error(() => <span>Upload Failed</span>)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setValue, props.name]
    )

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*",
    })

    const fileUpload = async (name, file) => {
      toast.loading(() => <span>Uploading image...please wait...</span>)
      setProcessing?.(true)
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/files/uploadImage`
      const formData = new FormData()
      formData.append("userId", String(userId || ""))
      formData.append("name", name)
      formData.append("width", String(width || ""))
      formData.append("height", String(height || ""))
      formData.append("file", file)
      const config = {
        timeout: 60000,
        headers: {
          "content-type": "multipart/form-data",
        },
      }

      const resp = await axios.post(url, formData, config)
      toast.dismiss()

      setProcessing?.(false)
      return resp
    }

    const removeFile = async () => {
      setProcessing?.(true)
      setShowConfirmDelete(false)

      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/files/removeFile`
      const config = {
        timeout: 60000,
        headers: {
          "content-type": "application/json",
        },
      }
      const resp = await axios.post(url, file, config)

      setProcessing?.(false)
      if (resp?.status === 204) {
        setValue(`${props.name}` as const, null, { shouldValidate: false })
        onDeleteSuccess?.()
      }
    }

    useEffect(() => {
      if (file && file.path) {
        getSignedUrl(file.path).then((url) => setImageUrl(url))
      } else {
        setImageUrl("")
      }
    }, [file])

    return (
      <div className="w-36" {...outerProps}>
        <Controller
          name={`${props.name}` as const}
          defaultValue={defaultValue || { Key: "", Location: "" }}
          render={() => (
            <>
              {imageUrl ? (
                <div className="w-full">
                  {label && (
                    <label className="block text-sm text-center font-medium text-gray-700">
                      {label}
                    </label>
                  )}
                  <div className="relative">
                    <div
                      className="w-full lg:w-28 h-28 rounded"
                      style={{
                        background: `url(${imageUrl})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <button
                        className="absolute top-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 m-2"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowConfirmDelete(true)
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <ConfirmationModal
                        open={showConfirmDelete}
                        onConfirm={removeFile}
                        onCancel={() => setShowConfirmDelete(false)}
                        confirmText={"Yes, delete"}
                        cancelText={"No, keep"}
                      >
                        <Image height="51" width="53" src={BlueDeleteIcon} alt="" />
                        <h5 className="text-2xl text-button font-bold">Delete avatar?</h5>
                        <p>
                          This action will permanently delete your avatar. Are you sure you want to
                          proceed?
                        </p>
                      </ConfirmationModal>
                    </div>
                  </div>
                </div>
              ) : (
                <div {...getRootProps({ className: "btn-dropzone" })}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <div className="mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded">
                    <div className="flex flex-col text-sm text-gray-600 px-6">
                      <div className="grid justify-items-center w-full mb-1 block mt-6 text-center">
                        {isProcessing && (
                          <>
                            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
                            <p className="block w-full text-gray-500 mt-2">Processing...</p>
                          </>
                        )}
                        {!isProcessing && (
                          <>
                            <svg
                              width="28"
                              height="27"
                              viewBox="0 0 28 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.458984"
                                y="0.578125"
                                width="26.6525"
                                height="25.6367"
                                rx="12.8184"
                                fill="#F1F4F8"
                              />
                              <path
                                d="M13.316 10.4682L13.316 16.2943C13.316 16.5356 13.5194 16.7312 13.7703 16.7312C14.0212 16.7312 14.2246 16.5356 14.2246 16.2943L14.2246 10.4682C14.2246 10.2269 14.0212 10.0312 13.7703 10.0312C13.5194 10.0312 13.316 10.2269 13.316 10.4682Z"
                                fill="gray"
                              />
                              <path
                                d="M16.7898 12.9343H10.7324C10.4815 12.9343 10.2781 13.13 10.2781 13.3715C10.2781 13.6129 10.4815 13.8086 10.7324 13.8086H16.7898C17.0407 13.8086 17.2441 13.6129 17.2441 13.3715C17.2441 13.13 17.0407 12.9343 16.7898 12.9343Z"
                                fill="gray"
                              />
                            </svg>
                            <p className="block w-full text-gray-500 mt-2">Upload Your Photo</p>
                          </>
                        )}
                      </div>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <button onClick={(e) => e.preventDefault()}>
                          {" "}
                          {/* or click to select image */}
                        </button>
                        <input
                          {...props}
                          {...getInputProps()}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          disabled={isProcessing}
                        />
                      </label>
                      .{/* <p className="text-xs text-gray-500">Max 10MB</p> */}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        />
      </div>
    )
  }
)

export default SingleImageUploadField

function uiReducer(uiReducer: any, initialState: any): [any, any] {
  throw new Error("Function not implemented.")
}

function initialState(uiReducer: any, initialState: any): [any, any] {
  throw new Error("Function not implemented.")
}

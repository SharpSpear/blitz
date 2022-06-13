import React, { useEffect, useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Controller, useFormContext } from "react-hook-form"
import { isEmpty } from "lodash"
import { TrashIcon } from "@heroicons/react/outline"
import { Image } from "blitz"
interface ImageUploadProps {
  name: string
  defaultValue?: string
  label?: string
}

const ImageUpload = ({ name, defaultValue, label }: ImageUploadProps) => {
  const {
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext() || { formState: { isSubmitting: false, errors: {} } }

  const [files, setFiles] = useState<any[]>([])

  const [imagePreview, setImagePreview] = useState(defaultValue)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/*, video/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          setValue(name, file)
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        })
      )
    },
  })

  useEffect(() => {
    if (Boolean(imagePreview)) {
      setFiles([{ preview: imagePreview }])
    }
  }, [imagePreview])

  const removeFile = async () => {
    setFiles([])
    setValue("imageUrl", "")
    setImagePreview("")
  }

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  useEffect(() => {
    register?.(name)
  }, [name, register])

  const thumbs = files.map((file, i) => (
    <div key={i} className="w-full h-full relative p-2">
      <div
        style={{
          backgroundImage: `url(${file.preview})`,
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
        }}
      />

      <button
        className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 m-2"
        type="button"
        disabled={isSubmitting}
        onClick={(e) => {
          e.preventDefault()
          removeFile()
        }}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  ))

  return (
    <Controller
      name={`${name}` as const}
      render={() => {
        return (
          <div className="w-full">
            {label && <p className="mb-1 text-gray-700">{label}</p>}
            <div className="overflow-hidden w-full h-32 border-2 border-gray-300 border-dashed p-4 flex justify-center items-center text-center text-gray-500">
              {isEmpty(files) ? (
                <div
                  {...getRootProps({
                    className: "dropzone flex flex-col items-center cursor-pointer",
                  })}
                >
                  <input disabled={isSubmitting} {...getInputProps()} />
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
                    <p>+</p>
                  </div>
                  <p>Upload an image or video clip</p>
                </div>
              ) : (
                <div className="w-full h-32">{thumbs}</div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

export default ImageUpload

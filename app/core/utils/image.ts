import axios from "axios"

export const imageUpload = async ({ userId, dirName, file }) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/files/uploadImage`
  // const url = process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_APP_URL}/api/files/uploadImage` : `http://localhost:3000/api/files/uploadImage`

  const formData = new FormData()
  formData.append("userId", String(userId))
  formData.append("name", dirName)
  formData.append("width", "")
  formData.append("height", "")
  formData.append("file", file)
  const config = {
    timeout: 60000,
    headers: {
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
  }

  const response = await axios.post(url, formData, config)

  if (response.status !== 201) {
    throw new Error("Failed to upload image!")
  }

  return `${process.env.BLITZ_PUBLIC_S3_BUCKET_URI}${response.data.path}`
  // return process.env.NODE_ENV === "production" ? `${process.env.BLITZ_PUBLIC_S3_BUCKET_URI}${response.data.path}` : `http://localhost:3000/${response.data.path}`
}

export const imageDelete = async (imageUrl) => {
  if (!imageUrl) {
    return
  }

  const fileKey = imageUrl.replace(String(process.env.BLITZ_PUBLIC_S3_BUCKET_URI), "")

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/files/removeFile`
  // const url = process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_APP_URL}/api/files/removeFile` : `http://localhost:3000/api/files/removeFile`

  const config = {
    timeout: 60000,
    headers: {
      "content-type": "application/json",
    },
  }

  await axios.post(url, { path: fileKey }, config)
}

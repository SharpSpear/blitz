import React, { FC } from "react"
import SingleImageUploadField from "../SingleImageUploadField"
import updateUserAvatar from "app/users/mutations/updateUserAvatar"
import { useMutation, useRouter } from "blitz"
import { FileUpload } from "db"
import { useUser } from "app/contexts/user.context"

interface Props {
  userId: number
  avatar: FileUpload
}

/**
 * @author Roel Abasa
 * @function UploadUserAvatar
 **/

const UploadUserAvatar: FC<Props> = (props) => {
  const { setAvatar } = useUser()

  const router = useRouter()
  const [updateUserAvatarMutation] = useMutation(updateUserAvatar)

  const handleUploadAvatarSuccess = async (file: FileUpload) => {
    try {
      await updateUserAvatarMutation({
        where: { id: props.userId || undefined },
        data: { avatarId: file.id },
      })
      setAvatar(file)
    } catch (error) {
      alert("Sorry, we had an unexpected error. Please try again. - " + error.toString())
    }
  }

  const handleDeleteAvatarSuccess = async () => {
    try {
      await updateUserAvatarMutation({
        where: { id: props.userId || undefined },
        data: { avatarId: null },
      })
      setAvatar("")
    } catch (error) {
      alert("Sorry, we had an unexpected error. Please try again. - " + error.toString())
    }
  }

  return (
    <SingleImageUploadField
      userId={props.userId}
      name="avatar"
      onUploadSuccess={handleUploadAvatarSuccess}
      onDeleteSuccess={handleDeleteAvatarSuccess}
    />
  )
}

export default UploadUserAvatar

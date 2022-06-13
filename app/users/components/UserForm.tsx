import React, { useState } from "react"
import { Image, useMutation, useRouter } from "blitz"
import LabeledInput from "app/components/molecules/LabeledInput"

import Form, { FormProps } from "app/components/molecules/Form"
import { CirclePlusIcon } from "app/assets"
import UploadUserAvatar from "app/components/molecules/UploadUserAvatar"
import { z } from "zod"
import { findIndex } from "lodash"
import EditableItem from "app/components/molecules/EditableItem"
import toast from "react-hot-toast"
import createWorkspace from "app/workspaces/mutations/createWorkspace"
import updateWorkspace from "app/workspaces/mutations/updateWorkspace"

import { uuid } from "uuidv4"
import { useUser } from "app/contexts/user.context"

export function UserForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & { currentPlan: string }
) {
  const router = useRouter()
  const [emailError, setEmailError] = useState("")

  const [createWorkspaceMutation] = useMutation(createWorkspace)
  const [updateWorkspaceMutation] = useMutation(updateWorkspace)

  const { workspaces, setWorkspaces, avatar, setAvatar, plan } = useUser()

  const addNewWorkspace = () => {
    const newWorkspaces = [...workspaces]
    newWorkspaces.unshift({ key: uuid(), id: null, name: "", mode: "edit" })
    setWorkspaces(newWorkspaces)
  }

  const saveWorkspace = async (workspace) => {
    try {
      if (workspace.id) {
        const toastId = toast.loading(() => <span>Updating Workspace</span>)

        await updateWorkspaceMutation({
          where: { id: workspace?.id },
          data: { name: workspace.name },
          initial: workspace!,
        })
        const newWorkspaces = [...workspaces]
        const idx = findIndex(workspaces, { id: workspace.id })
        newWorkspaces[idx] = workspace
        setWorkspaces(newWorkspaces)

        toast.success(() => <span>Workspace Updated</span>, { id: toastId })
      } else {
        const toastId = toast.loading(() => <span>Creating Workspace</span>)

        await createWorkspaceMutation(workspace)
        toast.success(() => <span>Workspace Created</span>, { id: toastId })
      }
    } catch (error) {
      toast.error(error.toString())
    }
  }

  const cancelEdit = (workspace) => {
    const index = findIndex(workspaces, { key: workspace.key })
    if (index > -1) {
      workspaces.splice(index, 1)
      setWorkspaces([...workspaces])
    }
  }

  return (
    <>
      <Form<S> {...props}>
        <div className="flex flex-wrap overflow-hidden sm:-mx-3 md:-mx-2 lg:-mx-5 xl:-mx-8 lg:px-10">
          <div className="flex flex-col gap-y-8 w-full">
            <div className="flex justify-center">
              <UploadUserAvatar
                avatar={props.initialValues?.["avatar"]}
                userId={props.initialValues?.["id"]}
              />
            </div>
            <div className="flex gap-x-4">
              <div className="sm:w-full lg:w-1/2">
                <LabeledInput
                  name="firstName"
                  label="First Name"
                  placeholder="Minimum 3 letters"
                  testid="signupFirstName"
                />
              </div>
              <div className="sm:w-full lg:w-1/2">
                <LabeledInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Minimum 3 letters"
                  testid="signupLastName"
                />
              </div>
            </div>

            <div className="flex gap-x-4">
              <div className="sm:w-full lg:w-1/2">
                <LabeledInput
                  name="email"
                  label="Email"
                  placeholder="name@mail.com"
                  testid="signupEmail"
                  error={emailError}
                />
              </div>
              <div className="sm:w-full lg:w-1/2">
                <LabeledInput
                  name="currentPlan"
                  label="Current Plan"
                  placeholder="Free Plan"
                  testid="current-plan"
                  error={emailError}
                  value={props.currentPlan + " Plan"}
                  disabled
                />
              </div>
            </div>
            {/* <div className="flex gap-x-4">
              <div className="sm:w-full lg:w-1/2">
                <span className="leading-8 text-sm font-medium text-gray-700 pr-2">
                  My Workspaces
                </span>
                <button type="button" onClick={addNewWorkspace}>
                  <Image
                    className="mx-2"
                    src={CirclePlusIcon}
                    width="16"
                    height="16"
                    alt="delete"
                  />
                </button>
                {workspaces &&
                  workspaces.map((workspace, i) => {
                    return (
                      <EditableItem
                        handleSave={saveWorkspace}
                        handleCancel={cancelEdit}
                        type="Workspace"
                        key={i}
                        item={workspace}
                      />
                    )
                  })}
              </div>
              <div className="sm:w-full lg:w-1/2">
                <LabeledInput
                  prefix="twitter.com/"
                  name="twitterHandle"
                  label="Social accounts (optional)"
                  placeholder=""
                />
              </div>
            </div> */}
          </div>
        </div>
      </Form>
    </>
  )
}

export default UserForm

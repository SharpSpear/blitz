import { getSignedUrl } from "app/core/utils/s3"
import { FileUpload, Workspace } from "db"
import React, { FC, useMemo } from "react"
import { ExtendedUser } from "types"

export interface State {
  isProcessing: boolean
  user: ExtendedUser | null
  avatar: string
  workspaces: Workspace[]
}

const initialState = {
  isProcessing: false,
  user: null,
  avatar: "",
  workspaces: [],
}

type Action =
  | {
      type: "LOAD_WORKSPACES"
    }
  | {
      type: "SET_WORKSPACES"
      workspaces: Workspace[]
    }
  | {
      type: "SET_AVATAR"
      avatar: string
    }

export const UserContext = React.createContext<State | any>(initialState)

UserContext.displayName = "UserContext"

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "LOAD_WORKSPACES": {
      return {
        ...state,
      }
    }
    case "SET_WORKSPACES": {
      return {
        ...state,
        workspaces: action.workspaces,
      }
    }
    case "SET_AVATAR": {
      return {
        ...state,
        avatar: action.avatar,
      }
    }
  }
}

export const UserProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState)
  const setWorkspaces = (workspaces: Workspace[]) => {
    dispatch({ type: "SET_WORKSPACES", workspaces })
  }
  const setAvatar = async (file: FileUpload) => {
    let avatar = ""
    if (file?.path) {
      avatar = await getSignedUrl(file.path)
    }
    dispatch({ type: "SET_AVATAR", avatar })
  }
  const value = useMemo(
    () => ({
      ...state,
      setWorkspaces,
      setAvatar,
    }),
    [state]
  )

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

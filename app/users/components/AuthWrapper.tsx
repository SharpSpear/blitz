import { UserProvider, useUser } from "app/contexts/user.context"
import { Workspace } from "db"
import { isArray, each } from "lodash"
import React, { FC, useEffect } from "react"
import { ExtendedUser } from "types"

interface IProps {
  user?: ExtendedUser | null
}

/**
 * @author Roel Abasa
 * @function @AuthWrapper
 **/

export const AuthWrapper: FC<IProps> = ({ user, children }) => {
  const { setWorkspaces, setAvatar, avatar } = useUser()
  useEffect(() => {
    if (user) {
      const workspaces: Workspace[] = []
      each(user?.memberships || [], (membership) => {
        workspaces.push(membership.workspace)
      })
      setWorkspaces?.(workspaces)
      setAvatar(user.avatar)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return <>{children}</>
}

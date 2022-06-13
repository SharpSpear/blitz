import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, Workspace } from "db"
import { Prisma } from "@prisma/client"
import { plans } from "app/core/utils/plans"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

export type Plan = keyof typeof plans

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
      workspaceSlug: Workspace["slug"]
    }
  }
}

export type ExtendedWorkspace = Prisma.WorkspaceGetPayload<{ include: { memberships: true } }>
export type ExtendedUser = Prisma.UserGetPayload<{
  include: {
    avatar: true
    memberships: {
      include: {
        workspace: true
      }
    }
  }
}>

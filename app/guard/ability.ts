import db from "db"
import { GuardBuilder } from "@blitz-guard/core"

type ExtendedResourceTypes = "workspace" | "user" | "project" | "change"

type ExtendedAbilityTypes = "send email"

const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx, { can, cannot }) => {
    cannot("manage", "all")

    if (ctx.session.$isAuthorized()) {
      // projects
      can("create", "project")
      can("create", "change")
      can("create", "workspace")
      can("read", "workspace", async (args) => {
        const workspace = await db.workspace.findFirst({
          where: args.where,
          include: {
            memberships: true,
          },
        })

        return workspace?.memberships.some((p) => p.userId === ctx.session.userId) === true
      })
      can("update", "workspace", async (args) => {
        const workspace = await db.workspace.findFirst({
          where: args.where,
          include: {
            memberships: true,
          },
        })

        const owner = workspace?.memberships.find((p) => p.role === "OWNER")
        return owner?.userId === ctx.session.userId
      })

      can("update", "user", async (args) => {
        return args.where.id === ctx.session.userId
      })

      can("update", "change", async (args) => {
        const change = await db.record.findFirst({ where: { id: args.changeId } })

        return change?.ownerId === ctx.session.userId
      })
    }
  }
)

export default Guard

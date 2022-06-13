import { Ctx } from "blitz"
import db, { Prisma } from "db"
import { Workspace } from "app/workspaces/validations"
import slugify from "slugify"
import Guard from "app/guard/ability"
import { ExtendedWorkspace } from "types"
import { findFreeSlug } from "app/core/utils/findFreeSlug"

type UpdateWorkspaceInput = Pick<Prisma.WorkspaceUpdateArgs, "where" | "data"> & {
  initial: ExtendedWorkspace
}

async function updateWorkspace({ where, data, initial }: UpdateWorkspaceInput, ctx: Ctx) {
  ctx.session.$authorize()

  const { name } = Workspace.parse(data)

  const newSlug: string = await findFreeSlug(
    name,
    async (e) => await db.workspace.findFirst({ where: { slug: e } })
  )

  const workspace = await db.workspace.update({
    where,
    data: {
      name,
      slug: initial.name !== name ? newSlug : initial.slug,
    },
  })

  return workspace
}

export default Guard.authorize("update", "workspace", updateWorkspace)

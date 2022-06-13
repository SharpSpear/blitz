import { Ctx, AuthenticationError } from "blitz"
import db from "db"
import slugify from "slugify"
import { Workspace, WorkspaceInputType } from "app/workspaces/validations"
import Guard from "app/guard/ability"
import { findFreeSlug } from "app/core/utils/findFreeSlug"

async function createWorkspace(data: WorkspaceInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const { name } = Workspace.parse(data)
  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new AuthenticationError()

  const slug = slugify(name, { strict: true })
  const newSlug = await findFreeSlug(
    slug,
    async (e) => await db.workspace.findFirst({ where: { slug: e } })
  )

  const workspace = await db.workspace.create({
    data: {
      name: name,
      slug: newSlug,
      memberships: {
        create: {
          role: "OWNER",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    },
  })

  return workspace
}

export default Guard.authorize("create", "workspace", createWorkspace)

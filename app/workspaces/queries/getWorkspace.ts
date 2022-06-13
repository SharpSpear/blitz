import Guard from "app/guard/ability"
import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

interface GetWorkspaceInput extends Pick<Prisma.WorkspaceFindFirstArgs, "where"> {}

async function getWorkspace({ where }: GetWorkspaceInput, ctx: Ctx) {
  const workspace = await db.workspace.findFirst({
    where,
    include: {
      memberships: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!workspace) throw new NotFoundError()

  return workspace
}

export default Guard.authorize("read", "workspace", getWorkspace)

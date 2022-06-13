import { resolver } from "blitz"
import db, { prisma } from "db"
import { z } from "zod"

const DeleteProject = z.object({
  slug: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteProject),
  resolver.authorize(),
  async ({ slug }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const project = await db.prospect.findFirst({ where: { slug } })
    if (project) {
      const deleteChanges = db.record.deleteMany({
        where: {
          prospectId: project.id,
        },
      })
      const deleteProjects = db.prospect.deleteMany({
        where: {
          slug,
        },
      })
      const transaction = await db.$transaction([deleteChanges, deleteProjects])
      return transaction
    }
  }
)

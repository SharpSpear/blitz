import { resolver } from "blitz"
import db, { prisma } from "db"
import { z } from "zod"

const VoteProject = z.object({
  slug: z.string(),
  id: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(VoteProject),
  resolver.authorize(),
  async ({ id, slug }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const project = await db.prospect.findFirst({ where: { slug } })
    if (project && id) {
      const voteArr = project.votes
      if (voteArr.indexOf(id) !== -1) {
        return false
      } else {
        const project = await db.prospect.update({
          where: { slug },
          data: { votes: [...voteArr, id] },
        })
        return true
      }
    }
    return true
  }
)

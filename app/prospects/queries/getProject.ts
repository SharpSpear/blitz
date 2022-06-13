import { fullNameSelect } from "app/core/utils/user"
import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetProject = z.object({
  // This accepts type of undefined, but is required at runtime
  slug: z.string(),
})

export default resolver.pipe(resolver.zod(GetProject), resolver.authorize(), async ({ slug }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.prospect.findFirst({
    where: { slug },
    include: { owner: { select: fullNameSelect() } },
  })

  if (!project) throw new NotFoundError()

  return project
})

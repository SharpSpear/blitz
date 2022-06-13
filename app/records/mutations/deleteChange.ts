import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteChange = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteChange), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const change = await db.record.deleteMany({ where: { id } })

  return change
})

import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetChange = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetChange), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const change = await db.record.findFirst({ where: { id } })

  if (!change) throw new NotFoundError()

  return change
})

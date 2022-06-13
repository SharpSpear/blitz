import { fullNameSelect } from "app/core/utils/user"
import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(async () => {
  const parties = await db.party.findMany()

  if (!parties) throw new NotFoundError()

  return parties
})

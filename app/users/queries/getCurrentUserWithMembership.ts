import { Ctx } from "blitz"
import db from "../../../db"

export default async function getCurrentUserWithMembership(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    include: {
      avatar: true,
      memberships: {
        include: {
          workspace: true,
        },
      },
    },
  })

  return user
}

import { fullNameSelect, getFullName } from "app/core/utils/user"
import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, ...fullNameSelect(), email: true, role: true },
  })

  if (!user) throw new Error("User not found.")

  const name = getFullName(user)
  return { ...user, hashedPassword: "", name }
}

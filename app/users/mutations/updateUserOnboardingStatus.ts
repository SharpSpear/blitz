import { Ctx, SecurePassword } from "blitz"
import db, { Prisma } from "db"
import Guard from "app/guard/ability"

type UpdateUserOnboardedInput = Pick<Prisma.UserUpdateArgs, "where">

async function updateUserOnboarded({ where }: UpdateUserOnboardedInput, ctx: Ctx) {
  ctx.session.$authorize()

  await db.user.update({
    where,
    data: {
      onboarded: true,
    },
  })

  return
}
export default Guard.authorize("update", "user", updateUserOnboarded)

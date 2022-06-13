import { Ctx } from "blitz"
import db, { Prisma } from "db"
import Guard from "app/guard/ability"
import { UserAvatar } from "../validations"

type UpdateUserAvatarInput = Pick<Prisma.UserUpdateArgs, "where" | "data">

async function updateUserAvatar({ where, data }: UpdateUserAvatarInput, ctx: Ctx) {
  ctx.session.$authorize()

  const { avatarId } = UserAvatar.parse(data)
  const user = await db.user.update({
    where,
    data: { avatarId },
  })

  return user
}
export default Guard.authorize("update", "user", updateUserAvatar)

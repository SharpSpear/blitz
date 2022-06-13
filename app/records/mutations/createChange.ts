import { Ctx, AuthenticationError } from "blitz"
import db, { ChangeType } from "db"
import { Change, ChangeInputType } from "app/records/validations"
import Guard from "app/guard/ability"

async function createChange(data: ChangeInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new AuthenticationError()

  let { privateDesc, publicDesc, project, date, type, imageUrl } = Change.parse(data)

  const ownerId = user.id

  const change = await db.record.create({
    data: {
      isPublic: Boolean(publicDesc),
      type,
      privateDesc,
      publicDesc,
      prospectId: project.id,
      ownerId,
      date,
      imageUrl,
    },
  })

  return change
}

export default Guard.authorize("create", "change", createChange)

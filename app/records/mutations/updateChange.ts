import { Ctx, AuthenticationError } from "blitz"
import db, { ChangeType } from "db"
import { Change, ChangeInputType } from "app/records/validations"
import Guard from "app/guard/ability"

async function updateChange(data: ChangeInputType, ctx: Ctx) {
  ctx.session.$authorize()

  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new AuthenticationError()

  let { changeId, privateDesc, publicDesc, project, date, type, imageUrl } = Change.parse(data)

  const change = await db.record.update({
    where: { id: changeId },
    data: {
      isPublic: Boolean(publicDesc),
      type,
      privateDesc,
      publicDesc,
      prospectId: project.id,
      date,
      imageUrl,
    },
  })

  return change
}

export default Guard.authorize("update", "change", updateChange)

import { Ctx, SecurePassword } from "blitz"
import db, { Prisma } from "db"
import Guard from "app/guard/ability"
import { UserSettings } from "../validations"

type UpdateUserInput = Pick<Prisma.UserUpdateArgs, "where" | "data">

async function updateUser({ where, data }: UpdateUserInput, ctx: Ctx) {
  ctx.session.$authorize()

  // TODO: implement save user details (In-Progress)
  const { firstName, lastName, email } = UserSettings.parse(data)

  const emailExists = await db.user.count({
    where: { NOT: { id: ctx.session.userId }, email },
  })

  if (emailExists) {
    throw new Error("Email address is already in use.")
  }

  const user = await db.user.update({
    where,
    data: {
      firstName,
      lastName,
      email,
      // hashedPassword: password ? await SecurePassword.hash(password.trim()) : undefined,
    },
  })

  const name = `${user.firstName} ${user.lastName}`
  return { ...user, hashedPassword: "", name }
}
export default Guard.authorize("update", "user", updateUser)

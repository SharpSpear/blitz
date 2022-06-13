import { resolver, SecurePassword, AuthenticationError, generateToken, hash256 } from "blitz"
import db, { UserStatus, Workspace } from "db"
import { Login } from "../validations"
import { Role } from "types"


export default resolver.pipe(
  // resolver.zod(Login), 
  async ({ email }, ctx) => {
  // This throws an error if credentials are invalid
  // 1. Get the user
  // const user = await authenticateUser(email, password)
  const user = await db.user.findFirst({ where: { email, status: UserStatus.VERIFIED } })
  if(!user)
    return "Error";

  const workspace = await db.workspace.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          role: "OWNER",
        },
      },
    },
  })

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    workspaceSlug: workspace?.slug as Workspace["slug"],
  })

  return user
})

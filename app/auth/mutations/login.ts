import { resolver, SecurePassword, AuthenticationError, generateToken, hash256 } from "blitz"
import db, { UserStatus, Workspace } from "db"
import { Login } from "../validations"
import { Role } from "types"

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const email = rawEmail.toLowerCase().trim()
  const password = rawPassword.trim()
  const user = await db.user.findFirst({ where: { email, status: UserStatus.VERIFIED } })

  if (!user) throw new AuthenticationError("Invalid account or password.")

  try {
    const result = await SecurePassword.verify(user.hashedPassword, password)

    if (result === SecurePassword.VALID_NEEDS_REHASH) {
      // Upgrade hashed password with a more secure hash
      const improvedHash = await SecurePassword.hash(password)
      await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
    }

    const { hashedPassword, ...rest } = user
    return rest
  } catch (error) {
    throw new AuthenticationError("Incorrect password.")
  }
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password, rememberMe }, ctx) => {
  // This throws an error if credentials are invalid
  // 1. Get the user
  const user = await authenticateUser(email, password)

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

  if (rememberMe === "true") {
    const token = generateToken()
    const hashedToken = hash256(token)
    const expiresAt = new Date()
    const ONE_WEEK_HOURS = 168
    expiresAt.setHours(expiresAt.getHours() + ONE_WEEK_HOURS)

    await db.token.deleteMany({
      where: {
        userId: user.id,
        type: "ACCESS_TOKEN",
      },
    })

    await db.token.create({
      data: {
        user: { connect: { id: user.id } },
        type: "ACCESS_TOKEN",
        expiresAt,
        hashedToken,
        sentTo: "",
      },
    })
    return { ...user, accessToken: hashedToken }
  }

  return user
})

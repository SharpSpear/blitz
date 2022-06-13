import { resolver, SecurePassword, Ctx, generateToken, hash256 } from "blitz"
import db, { TokenType, UserStatus } from "db"
import { Signup } from "app/auth/validations"

import { findFreeSlug } from "app/core/utils/findFreeSlug"
import { emailVerificationMailer } from "mailers/emailVerificationMailer"
import { getFullName } from "app/core/utils/user"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, lastName, firstName }, ctx: Ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    let user
    try {
      user = await db.user.create({
        data: {
          email: email.toLowerCase().trim(),
          hashedPassword,
          role: "USER",
          firstName,
          lastName,
          status: UserStatus.PENDING,
        },
      })
    } catch (error) {
      throw new Error("Email is already taken")
    }

    const organization = `${firstName.trim()} ${lastName.trim()}`
    const newSlug: string = await findFreeSlug(
      organization,
      async (e) => await db.workspace.findFirst({ where: { slug: e } })
    )

    await db.workspace.create({
      data: {
        name: organization,
        slug: newSlug,
        memberships: {
          create: {
            role: "OWNER",
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    })

    // generate token for email verification
    const token = generateToken()
    const hashedToken = hash256(token)
    const expiresAt = new Date()
    const EXPIRATION_HOURS = 48
    expiresAt.setHours(expiresAt.getHours() + EXPIRATION_HOURS)

    await db.token.create({
      data: {
        user: { connect: { id: user.id } },
        type: TokenType.EMAIL_VERIFICATION_TOKEN,
        expiresAt,
        hashedToken,
        sentTo: email,
      },
    })

    // Send the email
    emailVerificationMailer({ name: getFullName(user), email, token }).send()

    return { ...user, token }
  }
)

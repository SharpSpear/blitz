import { getFullName } from "app/core/utils/user"
import { resolver, hash256 } from "blitz"
import db, { TokenType, UserStatus } from "db"
import { emailVerificationMailer } from "mailers/emailVerificationMailer"
import { EmailVerification } from "../validations"

export class EmailVerificationError extends Error {
  name = "EmailVerificationError"
  message = "Email verification token is invalid or it has expired."
}

export default resolver.pipe(resolver.zod(EmailVerification), async ({ token }, ctx) => {
  // 1. Try to find this token in the database
  const hashedToken = hash256(token)
  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: TokenType.EMAIL_VERIFICATION_TOKEN },
    include: { user: true },
  })

  // 2. If token not found, error
  if (!possibleToken) {
    throw new EmailVerificationError()
  }
  const savedToken = possibleToken

  // 4. If token has expired, error
  if (savedToken.expiresAt < new Date()) {
    throw new EmailVerificationError()
  }

  // find user
  const user = await db.user.findFirst({
    where: { id: savedToken.userId },
  })

  // Send the email
  emailVerificationMailer({ name: getFullName(user), email: user?.email || "", token }).send()

  return true
})

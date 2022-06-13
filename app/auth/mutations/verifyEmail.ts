import { resolver, hash256 } from "blitz"
import db, { TokenType, UserStatus } from "db"
import { EmailVerification } from "../validations"

export class EmailVerificationError extends Error {
  name = "EmailVerificationError"
  message = "Email verification link is invalid or it has expired."
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

  // 3. Delete token so it can't be used again
  const p1 = db.token.delete({ where: { id: savedToken.id } })

  // 4. If token has expired, error
  if (savedToken.expiresAt < new Date()) {
    throw new EmailVerificationError()
  }

  // update user status as Verified
  const p2 = db.user.update({
    where: { id: savedToken.userId },
    data: { status: UserStatus.VERIFIED },
  })

  await Promise.all([p1, p2])

  return true
})

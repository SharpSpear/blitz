/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import { sendMail } from "app/core/utils/sendMail"
import previewEmail from "preview-email"

type VerificationMailer = {
  name: string
  email: string
  token: string
}

export function emailVerificationMailer({ name, email, token }: VerificationMailer) {
  // In production, set NEXT_PUBLIC_APP_URL to your production server origin
  const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.BLITZ_DEV_SERVER_ORIGIN
  const verification_url = `${origin}/verify?token=${token}`
  const unsubscribe_url = `${origin}/unsubscribe?token=${token}`

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        const msg = {
          To: email,
          TemplateModel: {
            name,
            email,
            verification_url,
            unsubscribe_url,
          },
          TemplateId: process.env.POSTMARK_EMAIL_VERIFICATION_TEMPLATEID,
        }
        await sendMail(msg)
      } else {
        const msg = {
          from: "TODO@example.com",
          to: email,
          subject: "Account Verification",
          html: `
            <h1>Hi ${name}!</h1>
            <h2>Verify your email addresss</h2>
            <h3>Thank you for signing up to ${process.env.PROJECT_NAME}. Click on the link below to verify your email:</h3>

            <a href="${verification_url}">
              ${verification_url}
            </a>
          `,
        }
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}

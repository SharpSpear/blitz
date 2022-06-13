/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import { sendMail } from "app/core/utils/sendMail"
import previewEmail from "preview-email"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set NEXT_PUBLIC_APP_URL to your production server origin
  const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.BLITZ_DEV_SERVER_ORIGIN
  const reset_password_url = `${origin}/reset-password?token=${token}`

  const email = to
  return {
    async send() {
      if (process.env.NODE_ENV !== "production") {
        const msg = {
          To: email,
          TemplateModel: {
            reset_password_url,
          },
          TemplateId: process.env.POSTMARK_RESET_PASSWORD_TEMPLATEID,
        }
        await sendMail(msg)
      } else {
        const msg = {
          from: "TODO@example.com",
          to,
          subject: "Your Password Reset Instructions",
          html: `
            <h1>Reset Your Password</h1>
            <h3>NOTE: You must set up a production email integration in mailers/forgotPasswordMailer.ts</h3>

            <a href="${reset_password_url}">
              Click here to set a new password
            </a>
          `,
        }
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}

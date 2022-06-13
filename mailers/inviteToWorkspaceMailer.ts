/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email"
import db from "db"

type InviteToWorkspaceInput = {
  to: string
  token: string
  workspaceId: string
}

export async function inviteToWorkspaceMailer({ to, token, workspaceId }: InviteToWorkspaceInput) {
  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  })

  const origin = process.env.NEXT_PUBLIC_APP_URL || process.env.BLITZ_DEV_SERVER_ORIGIN
  const webhookUrl = `${origin}/api/invitations/accept?token=${token}&workspaceId=${workspace?.id}`

  const msg = {
    from: "TODO@example.com",
    to,
    subject: "You have been invited to a workspace",
    html: `
      <h1>You've been invited to ${workspace?.name}</h1>

      <a href="${webhookUrl}">
        Click here to accept your invite
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        // TODO - send the production email, like this:
        // await postmark.sendEmail(msg)
        throw new Error("No production email implementation in mailers/inviteToWorkspaceMailer")
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}

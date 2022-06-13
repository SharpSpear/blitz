import { generateToken, hash256, Ctx } from "blitz"
import Guard from "app/guard/ability"
import db from "db"
import { inviteToWorkspaceMailer } from "mailers/inviteToWorkspaceMailer"

interface InviteToWorkspaceInput {
  workspaceId: string
  email: string
}

async function inviteToWorkspace({ workspaceId, email }: InviteToWorkspaceInput, ctx: Ctx) {
  ctx.session.$authorize()

  const inviter = await db.membership.findFirst({
    where: {
      userId: ctx.session.userId,
      workspaceId: workspaceId,
    },
  })

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    include: {
      memberships: true,
    },
  })

  if (!workspace || !inviter) return new Error("No workspace or inviter selected")

  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 2)

  await db.token.create({
    data: {
      user: { connect: { id: inviter.userId } },
      type: "INVITE_TOKEN",
      expiresAt,
      hashedToken,
      sentTo: email,
    },
  })

  const buildEmail = await inviteToWorkspaceMailer({ to: email, token, workspaceId })

  await buildEmail.send()

  return `${process.env.NEXT_PUBLIC_APP_URL}/api/invitations/accept?token=${token}&workspaceId=${workspace?.id}`
}

export default Guard.authorize("update", "workspace", inviteToWorkspace)

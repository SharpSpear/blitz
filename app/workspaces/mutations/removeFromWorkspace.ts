import { Ctx } from "blitz"
import Guard from "app/guard/ability"
import db from "db"
import stripe from "app/core/utils/stripe"

interface InviteToWorkspaceInput {
  workspaceId: string
  userId: number
}

async function removeFromWorkspace({ workspaceId, userId }: InviteToWorkspaceInput, ctx: Ctx) {
  ctx.session.$authorize()

  const membership = await db.membership.findFirst({
    where: {
      workspace: {
        id: workspaceId,
      },
      user: {
        id: userId,
      },
    },
  })

  await db.membership.delete({
    where: {
      id: membership?.id,
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

  if (workspace?.stripeSubscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(
      workspace?.stripeSubscriptionId as string
    )
    await stripe.subscriptions.update(workspace?.stripeSubscriptionId as string, {
      proration_behavior: "none",
      items: [
        {
          id: subscription.items.data[0]?.id,
          quantity: workspace?.memberships.length,
        },
      ],
    })
  }
}

export default Guard.authorize("update", "workspace", removeFromWorkspace)

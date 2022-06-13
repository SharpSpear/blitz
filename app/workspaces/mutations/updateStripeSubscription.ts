import { Ctx } from "blitz"
import db from "db"
import stripe from "app/core/utils/stripe"
import { plans } from "app/core/utils/plans"

interface CreateStripeCheckoutSessionInput {
  workspaceId: string
  plan: string
}

async function updateStripeSubscription(
  { workspaceId, plan }: CreateStripeCheckoutSessionInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const planId = plans[plan].priceId

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    include: {
      memberships: true,
    },
  })

  const subscription = await stripe.subscriptions.retrieve(
    workspace?.stripeSubscriptionId as string
  )
  await stripe.subscriptions.update(workspace?.stripeSubscriptionId as string, {
    proration_behavior: "none",
    items: [
      {
        id: subscription.items.data[0]?.id,
        price: planId,
        quantity: workspace?.memberships.length,
      },
    ],
  })

  await db.workspace.update({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    data: {
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: planId,
    },
  })

  return
}

export default updateStripeSubscription

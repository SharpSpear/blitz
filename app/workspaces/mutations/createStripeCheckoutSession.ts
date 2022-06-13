import { Ctx } from "blitz"
import db from "db"
import stripe from "app/core/utils/stripe"
import { plans } from "app/core/utils/plans"

interface CreateStripeCheckoutSessionInput {
  workspaceId: string
  plan: string
  quantity: number
}

async function createStripeCheckoutSession(
  { workspaceId, plan, quantity }: CreateStripeCheckoutSessionInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const planId = plans[plan].priceId

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  })

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: planId,
        quantity: quantity,
      },
    ],
    metadata: {
      workspaceId,
      userId: ctx.session.userId,
    },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/${workspace?.slug}/settings/billing/`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/${workspace?.slug}/settings/billing`,
  })

  return session?.id
}

export default createStripeCheckoutSession

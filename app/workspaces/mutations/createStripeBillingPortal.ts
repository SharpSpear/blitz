import { Ctx } from "blitz"
import db from "db"
import stripe from "app/core/utils/stripe"

interface CreateStripeBillingPortalInput {
  workspaceId: string
}

async function createStripeBillingPortal(
  { workspaceId }: CreateStripeBillingPortalInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  })

  if (!workspace || !workspace.stripeCustomerId) return null

  const { url } = await stripe.billingPortal.sessions.create({
    customer: workspace.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/workspaces/${workspace.slug}/settings`,
  })

  return url
}

export default createStripeBillingPortal

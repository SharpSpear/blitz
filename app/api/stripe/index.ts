import Stripe from "stripe"
import stripe from "app/core/utils/stripe"
import db from "db"
import getRawBody from "raw-body"

interface ISession {
  customer: string
  metadata: {
    workspaceId: string
  }
  subscription: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const body = await getRawBody(req)
  let event: Stripe.Event | null

  try {
    event = stripe.webhooks.constructEvent(
      body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK!
    )
  } catch (err) {
    res.status(400).send(`${err.message}`)
    return
  }

  const session = event.data?.object as ISession

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription)

    await db.workspace.update({
      where: {
        id: session.metadata.workspaceId,
      },
      data: {
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: session.customer,
        stripePriceId: subscription.items.data[0]?.price.id,
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription)

    await db.workspace.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        stripePriceId: subscription.items.data[0]?.price.id,
      },
    })
  }

  res.json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

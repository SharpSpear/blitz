import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  // @ts-ignore
  apiVersion: null,
  appInfo: {
    name: "1upBlitz",
  },
})

export default stripe

import { useMutation, useRouter } from "blitz"
import { loadStripe } from "@stripe/stripe-js"
import createStripeCheckoutSession from "app/workspaces/mutations/createStripeCheckoutSession"
import updateStripeSubscription from "app/workspaces/mutations/updateStripeSubscription"
import { Plan } from "types"
import { toast } from "react-hot-toast"

export default function SubscribeButton({
  workspaceId,
  plan,
  quantity,
  type,
  testid,
}: {
  workspaceId: string
  plan: Plan
  quantity: number
  type: "new" | "update"
  testid?: string
}) {
  const [createStripeSessionMutation] = useMutation(createStripeCheckoutSession)
  const [updateStripeSubscriptionMutation] = useMutation(updateStripeSubscription)
  const router = useRouter()

  const createSubscription = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!)
    const sessionId = await createStripeSessionMutation({ plan, workspaceId, quantity })

    stripe?.redirectToCheckout({
      sessionId: sessionId,
    })
  }

  const updateSubscription = async () => {
    const toastId = toast.loading(() => <span>Upgrading Subscription</span>)
    try {
      await updateStripeSubscriptionMutation({ plan, workspaceId })
      toast.success(() => <span>Subscription Updated</span>, { id: toastId })
      router.reload()
    } catch (error) {
      toast.error("Sorry, we had an unexpected error. Please try again. - " + error.toString())
    }
  }

  return (
    <button
      className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
      data-testid={`${testid && `${testid}-`}upgradeButton`}
      onClick={(e) => {
        e.preventDefault()
        return type === "new" ? createSubscription() : updateSubscription()
      }}
    >
      {type === "new" ? "Subscribe" : "Upgrade"}
    </button>
  )
}

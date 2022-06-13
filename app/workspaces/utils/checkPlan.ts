import { Plan } from "types"
import { Workspace } from "db"
import { plans } from "app/core/utils/plans"

export const checkPlan = (workspace: Workspace | null): Plan | null => {
  if (
    !workspace ||
    !workspace.stripePriceId ||
    !workspace.stripeCurrentPeriodEnd ||
    workspace.stripeCurrentPeriodEnd.getTime() < Date.now()
  ) {
    return null
  } else {
    const plan = Object.keys(plans).find(
      (plan) => plans[plan as Plan].priceId === workspace.stripePriceId
    )
    return (plan as Plan) || null
  }
}

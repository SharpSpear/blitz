import { z } from "zod"

export const Workspace = z.object({
  name: z.string(),
  slug: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
})

export type WorkspaceInputType = z.infer<typeof Workspace>

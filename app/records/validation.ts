import { z } from "zod"

export const Change = z.object({
  redactedData: z.string(),
  fullData: z.string().optional(),
  majorMilestone: z.boolean(),
  public: z.boolean().optional().default(false),
})

export type ProjectInputType = z.infer<typeof Change>

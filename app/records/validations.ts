import { z } from "zod"
import { Plan } from "db"

export const Change = z
  .object({
    userPlan: z.enum([Plan.FREE, Plan.ENTERPRISE, Plan.STARTUP]),
    image: typeof window === "undefined" ? z.any().optional() : z.instanceof(File).optional(),
    imageUrl: z.string().optional(),
    changeId: z.number().optional(),
    type: z.any(),
    privateDesc: z.string().optional().default(""),
    publicDesc: z.string().optional().default(""),
    date: z.date(),
    project: z.object({
      id: z.number().int().positive(),
      slug: z.string(),
    }),
  })
  .refine(
    (values) => {
      if (values.userPlan === Plan.FREE && !values.publicDesc) {
        return false
      }

      return true
    },
    { message: "This field is required", path: ["publicDesc"] }
  )

export type ChangeInputType = z.infer<typeof Change>

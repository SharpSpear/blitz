import { z } from "zod"

// accepts empty string https://www.website.com, www.website.com, website.com
const urlRegex = /^$|[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const Project = z.object({
  image: typeof window === "undefined" ? z.any().optional() : z.instanceof(File).optional(),
  imageUrl: z.string().optional(),
  id: z.number().optional(),
  name: z.string().nonempty("The field cannot be empty").min(3, "Minimum of 3 letters/numbers"),
  slug: z.string().regex(slugRegex, { message: "Invalid slug" }).optional(),
  url: z.string().regex(urlRegex, { message: "Invalid URL" }).optional().nullable(),
  partyName: z.string().optional(),
  // party: z.string().regex(urlRegex, { message: "Invalid URL" }).optional().nullable(),
  twitterHandle: z.string().optional().default(""),
  linkedinHandle: z.string().optional().default(""),
  facebookHandle: z.string().optional().default(""),
  instagramHandle: z.string().optional().default(""),
  role: z.string().optional(),
  ownerId: z.number().nullable().optional(),
  isPublic: z
    .any()
    .transform((val) => (String(val) === "1" || String(val) === "true" ? true : false)),
})

export type ProjectInputType = z.infer<typeof Project>

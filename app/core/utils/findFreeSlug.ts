import slugify from "slugify"

export async function findFreeSlug(name, fetchResults, maxAttempts = 10) {
  const prefix = slugify(name, { strict: true, lower: true })

  for (let i = 1; i < maxAttempts; i++) {
    const slug = i > 1 ? `${prefix}-${i}` : prefix
    const result = await fetchResults(slug)

    if (!result) {
      return slug
    }
  }
  throw new Error(`Could not find a free slug for ${prefix} after ${maxAttempts} attempts`)
}

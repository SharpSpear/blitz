import slugify from "slugify"

async function findFreeSlug(dbTable, name, maxAttempts = 10) {
  const prefix = slugify(name, { strict: true })
  for (let i = 1; i < maxAttempts; i++) {
    const slug = i > 1 ? `${prefix}-${i}` : prefix
    const result = await dbTable.findFirst({ where: { slug: slug } })
    if (!result) {
      return slug
    }
  }
  throw new Error(`Could not find a free slug for ${prefix} after ${maxAttempts} attempts`)
}

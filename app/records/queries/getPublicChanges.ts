import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetChangesInput
  extends Pick<Prisma.RecordFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetChangesInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const { items: changes, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.record.count({ where }),
    query: (paginateArgs) => {
      return db.record.findMany({
        ...paginateArgs,
        where,
        orderBy,
        select: {
          id: true,
          isPublic: true,
          publicDesc: true,
          type: true,
          privateDesc: false,
          prospect: true,
          prospectId: true,
          owner: true,
          ownerId: true,
          date: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    },
  })

  return {
    changes,
    nextPage,
    hasMore,
    count,
  }
})

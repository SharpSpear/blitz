import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProjectsInput
  extends Pick<Prisma.ProspectFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProjectsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: projects, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.prospect.count({ where }),
      query: (paginateArgs) =>
        db.prospect.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { owner: true, records: true },
        }),
    })

    return {
      projects,
      nextPage,
      hasMore,
      count,
    }
  }
)

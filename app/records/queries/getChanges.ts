import { paginate, resolver, Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

interface GetChangesInput
  extends Pick<Prisma.RecordFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetChangesInput, ctx: Ctx) => {
    const project = await db.prospect.findFirst({
      where: { id: where?.prospectId },
      select: { ownerId: true },
    })

    if (!project) {
      throw new NotFoundError()
    }

    let query = {}

    if (project.ownerId === ctx.session.userId) {
      query = {
        where,
        orderBy,
        include: {
          prospect: true,
        },
      }
    } else {
      query = {
        where: {
          ...where,
          isPublic: true,
        },
        orderBy,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          publicDesc: true,
          type: true,
          prospectId: true,
          ownerId: true,
          date: true,
          imageUrl: true,
          isPublic: true,
        },
      }
    }

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: changes, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.record.count({ where }),
      query: (paginateArgs) => {
        return db.record.findMany({ ...paginateArgs, ...query })
      },
    })

    return {
      changes,
      nextPage,
      hasMore,
      count,
    }
  }
)

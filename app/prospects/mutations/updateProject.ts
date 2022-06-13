import { findFreeSlug } from "app/core/utils/findFreeSlug"
import { fullNameSelect, getFullName } from "app/core/utils/user"
import { AuthenticationError, resolver } from "blitz"
import db from "db"
import { isEmpty } from "lodash"

import { Project } from "../validations"

export default resolver.pipe(
  resolver.zod(Project),
  resolver.authorize(),
  async ({ slug, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!slug) {
      throw new Error("Slug is missing.")
    }

    // const project = await db.project.findFirst({ where: { slug } })

    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new AuthenticationError()

    let {
      id,
      name: projectName,
      url,
      partyName,
      isPublic,
      twitterHandle,
      facebookHandle,
      linkedinHandle,
      instagramHandle,
      imageUrl,
    } = Project.parse(data)
    const party = await db.party.findFirst({ where: { partyName: partyName } })

    if (isEmpty(slug?.trim())) {
      slug = await findFreeSlug(
        projectName,
        async (e) =>
          await db.prospect.findFirst({
            where: {
              slug: e,
              NOT: {
                ownerId: user.id,
              },
            },
          })
      )
    }

    // check duplicate for slug
    const slugCount = await db.prospect.count({
      where: {
        slug,
        NOT: {
          ownerId: user.id,
        },
      },
    })

    if (slugCount > 0) {
      throw new Error(`Slug is already taken.`)
    } else {
      const newData = {
        name: projectName,
        url,
        // party,
        isPublic,
        twitterHandle,
        facebookHandle,
        linkedinHandle,
        instagramHandle,
        slug,
        imageUrl,
      }
      const project = await db.prospect.update({
        where: { id },
        data: party ? { ...newData, partyId: party.id } : newData,
        include: { owner: { select: fullNameSelect() } },
      })
      // const project = await db.project.update({ where: { slug }, { })
      const name = getFullName(project?.owner)
      return { ...project, owner: { name } }
    }
  }
)

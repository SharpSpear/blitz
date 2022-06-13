import { Ctx, AuthenticationError } from "blitz"
import db, { ProspectRole } from "db"
import { Project, ProjectInputType } from "app/prospects/validations"
import Guard from "app/guard/ability"
import { isEmpty } from "lodash"
import { findFreeSlug } from "app/core/utils/findFreeSlug"

async function createProject(data: ProjectInputType, ctx: Ctx) {
  ctx.session.$authorize()
  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new AuthenticationError()

  let {
    name: projectName,
    slug = "",
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
      async (e) => await db.prospect.findFirst({ where: { slug: e } })
    )
  }

  // check duplicate for slug
  const slugCount = await db.prospect.count({ where: { slug } })
  if (slugCount > 0) {
    throw new Error(`Slug is already taken.`)
  } else {
    const ownerId = user.id
    const role = ProspectRole.OWNER
    const data = {
      name: projectName,
      slug,
      url,
      // partyId: party?.id ?? -1,
      isPublic,
      twitterHandle,
      facebookHandle,
      linkedinHandle,
      instagramHandle,
      ownerId,
      role,
      imageUrl,
    }
    const project = await db.prospect.create({
      data: party ? { ...data, partyId: party.id } : data,
    })

    return { ...project, owner: { firstName: user.firstName, lastName: user.lastName } }
  }
}

export default Guard.authorize("create", "project", createProject)

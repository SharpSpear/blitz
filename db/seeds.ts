import db, { User } from "./index"
import { SecurePassword } from "blitz"
import seedData from "./seedData.json"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
let userArray: User[] = []
async function createUsers() {
  for (let user of seedData.users) {
    try {
      const hashedPassword = await SecurePassword.hash(user.password.trim())
      const name = user.email.split("@")[0] || ""
      const domain = user.email.split("@")[1] || ""
      const createdUser = await db.user.create({
        data: {
          firstName: name,
          lastName: domain,
          email: user.email,
          hashedPassword,
          role: "USER",
        },
      })
      userArray = [...userArray, createdUser]
    } catch (err) {
      console.log(err)
    }
  }
}

async function createWorkspaces() {
  for (let workspace of seedData.workspaces) {
    try {
      const createdWorkspace = await db.workspace.create({
        data: {
          name: workspace.name,
          slug: workspace.slug,
          memberships: {
            create: {
              role: "OWNER",
              user: {
                connect: {
                  id: workspace.owner,
                },
              },
            },
          },
        },
      })

      for (let user of userArray.filter((u) => u.id !== workspace.owner)) {
        if (workspace.members.includes(user.id)) {
          await db.membership.create({
            data: {
              role: "USER",
              workspace: {
                connect: {
                  id: String(createdWorkspace.id),
                },
              },
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const seed = async () => {
  await db.$reset()
  await createUsers().then(async () => {
    await createWorkspaces()
  })
}

export default seed

import { getFullName } from "app/core/utils/user"
import { GetServerSideProps, getSession } from "blitz"
import db from "db"

const getCurrentUserServer = async ({ req, res }: Parameters<GetServerSideProps>[0]) => {
  const session = await getSession(req, res)

  if (session.userId) {
    const user = await db.user.findFirst({
      where: { id: session.userId },
      include: {
        avatar: true,
        memberships: {
          include: {
            workspace: true,
          },
        },
      },
    })

    if (!user) throw new Error("User not found.")

    const name = getFullName(user)
    return { ...user, hashedPassword: "", name }
  }

  return null
}

export default getCurrentUserServer

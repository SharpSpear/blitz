import { BlitzApiHandler, useMutation } from "blitz"
import db, { ProspectRole, ChangeType } from "db"
import _, { isEmpty } from "lodash"
import { findFreeSlug } from "app/core/utils/findFreeSlug"

const handler: BlitzApiHandler = async (req, res) => {
  if (req.method === "POST" && req.headers.origin === "https://whyvote.ph/") {
    try {
      // Process a POST request
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      // Request body
      const data = req.body
      const role = ProspectRole.OWNER
      const projectName = data.twitter_handle
      const tweets = data.tweets
      let slug = ""
      let imageUrl = ""
      // Verify that image is from pbs.twimg.com
      if (_.startsWith(data.twitter_avatar, "https://pbs.twimg.com")) {
        imageUrl = data.twitter_avatar
      }
      // Generate slug
      if (isEmpty(slug?.trim())) {
        slug = await findFreeSlug(
          projectName,
          async (e) => await db.prospect.findFirst({ where: { slug: e } })
        )
      }
      // Project values object
      const values = {
        name: projectName,
        slug,
        url: "",
        isPublic: true,
        twitterHandle: data.twitter_handle?.trim() ?? "",
        facebookHandle: "",
        linkedinHandle: "",
        instagramHandle: "",
        imageUrl,
        isClaimed: false,
        role,
      }
      // create project
      const project = await db.prospect.create({
        data: values,
      })
      // create changes if project creation was successful
      if (project) {
        const tweet_changes = tweets.map((tweet) => {
          // Date error check
          if (tweet.message) {
            const date = tweet.date ? new Date(tweet.date) : new Date()
            return {
              isPublic: true,
              type: ChangeType.TRACKRECORD,
              privateDesc: "",
              publicDesc: tweet.message?.trim(),
              projectId: project.id,
              date,
              imageUrl: "",
            }
          }
        })
        const changes = await db.record.createMany({
          data: tweet_changes,
        })
        if (changes) {
          res.end(
            JSON.stringify({
              status: "success",
              message: "tweets imported successfully",
              data: { project, changes },
            })
          )
        } else {
          await db.prospect.delete({ where: { id: project.id } })
          res.end(JSON.stringify({ status: "error", message: "could not add changes" }))
        }
      } else {
        res.end(JSON.stringify({ status: "error", message: "error" }))
      }
    } catch (error) {
      res.end(JSON.stringify({ status: "error", message: "An unknown error occurred", error }))
    }
  } else {
    // Handle any other HTTP method
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.end("Page not found")
  }
}
export default handler

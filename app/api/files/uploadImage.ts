import db from "db"
import { IncomingForm } from "formidable"
import fs from "fs"
import sharp from "sharp"
import { uuid } from "uuidv4"

import { uploadToS3 } from "app/core/utils/s3"

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const form = new IncomingForm()

  const result = await new Promise((resolve, reject) => {
    form.uploadDir = "./"
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      try {
        if (err) throw err

        let imageBuffer = fs.readFileSync(files.file.path)
        const mimetype = files.file.type

        const { userId, name, width, height } = fields

        const prefix = name + "/" + userId
        const bucketKey = `${prefix}/${uuid()}/${files.file.name}`

        if (width && height) {
          imageBuffer = await sharp(imageBuffer).resize(width, height).toBuffer()
        }
        await Promise.all([uploadToS3(bucketKey, imageBuffer, mimetype)])

        const image = db.fileUpload.create({
          data: {
            type: mimetype,
            dir: process.env.S3_BUCKET || "whyvote",
            path: bucketKey,
          },
        })

        res.statusCode = 201
        resolve({ ...image })
      } catch (e) {
        console.log("Upload error: ", e)
        res.status(500)
        reject({ error: e })
      }
    })
  })

  return res.json(result)
}

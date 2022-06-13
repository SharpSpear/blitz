import { IncomingForm } from "formidable"
import AWS from "aws-sdk"
import fs from "fs"

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  let s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: "v4",
  })

  const form = new IncomingForm()
  form.uploadDir = "./"
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    const image = fs.readFileSync(files.file.path)

    const params = {
      Key: files.file.name,
      ContentType: files.file.type,
      Body: image,
      Bucket: process.env.S3_BUCKET ? process.env.S3_BUCKET : "1upblitz",
    }

    let put = s3.upload(params)

    try {
      let response = await put.promise()

      res.status(200).send({
        Location: response.Location,
        Key: response.Key,
      })
    } catch (e) {
      res.status(500).send(e)
    }
  })
}

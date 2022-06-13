import AWS from "aws-sdk"

export const getBucket = () => {
  return process.env.S3_BUCKET || "whyvote"
}
export const getS3 = () => {
  return new AWS.S3({
    region: "us-east-2",
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    // endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: "v4",
  })
}

export const uploadToS3 = async (key, buffer, mimetype) => {
  const s3 = getS3()
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: getBucket(),
        ContentType: mimetype,
        Key: key,
        Body: buffer,
      },
      (err, data) => {
        err ? reject(err) : resolve(data)
      }
    )
  })
}

export const deleteFromS3 = async (key) => {
  const s3 = getS3()
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: getBucket(),
      Key: key,
    }
    s3.deleteObject(params, (err, _data) => {
      err ? reject(err) : resolve(1)
    })
  })
}

export function getSignedUrl(key, expires = 3600) {
  const s3 = getS3()
  return new Promise<string>((resolve, reject) => {
    s3.getSignedUrl(
      "getObject",
      {
        Bucket: process.env.S3_BUCKET || "whyvote",
        Key: key,
        Expires: expires,
      },
      function (err, url) {
        if (err) throw new Error(err?.toString())

        resolve(url)
      }
    )
  })
}

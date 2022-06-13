import { deleteFromS3 } from "app/core/utils/s3"

export const config = {
  api: {
    bodyParser: true,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  res.statusCode = 200
  const { path } = req.body // file info

  const result = deleteFromS3(path)

  res.status(204).send(result)
}

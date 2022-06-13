import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import path from "path"
const { BlitzGuardMiddleware } = require("@blitz-guard/core/dist/middleware")

const config: BlitzConfig = {
  env: {
    HTTPS: true,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: "10xv",
      isAuthorized: simpleRolesIsAuthorized,
    }),
    BlitzGuardMiddleware({
      excluded: [
        "/api/auth/mutations/login",
        "/api/auth/mutations/logout",
        "/api/auth/mutations/signup",
        "/api/guard/queries/getAbility",
      ],
    }),
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "assets.example.com",
      "whyvote.s3.us-east-2.amazonaws.com",
      "whyvote.s3.us-east-2.amazonaws.com",
      "pbs.twimg.com",
      "localhost",
    ],
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config

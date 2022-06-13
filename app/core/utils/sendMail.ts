var postmark = require("postmark")

export const sendMail = async (msg) => {
  if (!postmark) return

  // Send an email:
  const token = process.env.POSTMARK_TOKEN || ""
  msg["From"] = process.env.POSTMARK_SENDER_EMAIL || "know@whyvote.ph"
  if (token) {
    var client = new postmark.Client(token)

    const result = msg.TemplateId ? await client.sendEmailWithTemplate(msg) : client.sendEmail(msg)

    return result
  }
  throw new Error("Postmark Token is missing.")
}

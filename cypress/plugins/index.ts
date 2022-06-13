/**
 * @type {Cypress.PluginConfig}
 */

export {}

module.exports = (on, config) => {
  on("before:browser:launch", (browser: Record<string, string> = {}, launchOptions) => {
    // open dev tools only on Mobile viewport
    if (config.env.isMobile) {
      if (browser.family === "chromium" && browser.name !== "electron") {
        launchOptions.args.push("--auto-open-devtools-for-tabs")
      }
      if (browser.family === "firefox") {
        launchOptions.args.push("-devtools")
      }
      if (browser.name === "electron") {
        launchOptions.preferences.devTools = true
      }
      return launchOptions
    }
  })

  return config
}

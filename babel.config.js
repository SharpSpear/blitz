const { NODE_ENV } = process.env

const inProduction = NODE_ENV === "production"

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)
  return {
    presets: ["blitz/babel"],
    plugins: [
      "superjson-next",
      inProduction && ["react-remove-properties", { properties: ["data-testid"] }],
    ].filter(Boolean),
  }
}

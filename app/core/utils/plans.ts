export const plans = {
  pro: {
    priceId: process.env.PRO_PLAN,
    title: "Pro",
    price: 20,
    frequency: "/month",
    description: "The essentials to provide your best work for clients.",
    features: ["Lorem Ipsum", "Lorem Ipsum"],
  },
  pro2: {
    title: "Pro 2",
    price: 24,
    frequency: "/month",
    description: "The essentials to provide your best work for clients.",
    priceId: process.env.PRO2_PLAN,
    features: ["Lorem Ipsum", "Lorem Ipsum"],
  },
}

import React from "react"
import { Plan } from "db"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import ModalDialog from "app/components/molecules/ModalDialog"

const plans = [
  // {
  //   planId: Plan.FREE,
  //   title: "Basic",
  //   price: "Free",
  //   frequency: "",
  //   description: "Perfect plan for starters",
  //   features: [
  //     "Profile Page (coming soon)",
  //     "Public Updates",
  //     "Smart reminders to update (coming soon)",
  //     "Auth with Twitter and self-select tweets to import (coming soon)",
  //   ],
  //   extra: "",
  // },
  {
    planId: Plan.STARTUP,
    title: "GOLD",
    color: "#FFD700",
    price: "$20",
    frequency: "/mo",
    description: "There is no 'i' in TEAM!",
    features: [
      "Create up to 5 prospects",
      "Make prospects available to the public",
      "Join a party. (Party needs to be exist first)",
      "Update prospect records",
    ],
    extra:
      "*This is billed semi-anually.",
  },
  {
    planId: Plan.ENTERPRISE,
    title: "DIAMOND",
    color: "#9ac5db",
    price: "$99",
    frequency: "/mo",
    description: "Run a whole party!",
    features: ["Gold Membership Features", "Unlimited creation of prospects", "Custom Prospect Public Layout", "Dedicated Account Manager"],
    extra: "*This is billed semi-anually.",
  },
]

const PlanCard = ({
  plan: { planId, extra, title, color, price, frequency, description, features },
  currentPlan,
}) => {
  const [goWithThis, setGoWithThis] = React.useState(false)

  return (
    <div className="shadow-xl hover:shadow-2xl hover:scale-105 w-[300px] lg:w-[700px] transition-all my-4 px-6 py-3 border-l-4 border-white hover:border-[#49caa6]">
      <div className="items-center flex mb-8">
        <p className="font-bold text-2xl" style={{ color: color }}>{title}</p>
        <p className="text-gray-500 ml-5 ">{description}</p>
      </div>
      <div className="items-center flex mb-8">
        <p className="text-[#49caa6] font-bold text-3xl">
          {price}
          <span className="text-gray-500 font-normal text-2xl">{frequency}</span>
        </p>
        <div className="ml-auto">
          {currentPlan === planId ? (
            <div className="border border-[#1bbd90] p-2">Current Plan</div>
          ) : (
            <ButtonPrimary onClick={() => setGoWithThis(true)}>
              <span className="font-bold">Go With This</span>
            </ButtonPrimary>
          )}
        </div>
      </div>
      <ul className="list-disc ml-4 text-gray-600 mb-8">
        {features.map((feature, i) => (
          <li key={i}>
            <p className="py-2">{feature}</p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-[#49caa6]">{extra}</p>

      <ModalDialog open={goWithThis} onClose={() => setGoWithThis(false)}>
        <div className="flex justify-center">
          <div className=" shadow-lg bg-white p-8 w-[500px] ">
            <p className="text-[18px]">
              Contact us at <u>know@whyvote.ph</u> with the the subject{" "}
              <b>{`PURCHASE PLAN <Your chosen plan>`}</b>
            </p>
            <div className="flex justify-center">
              <div
                onClick={() => setGoWithThis(false)}
                className="bg-[#1BBD90] p-4 w-[130px] mt-3 text-white cursor-pointer text-center"
              >
                OK
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}

const Subscriptions = ({ currentPlan }: { currentPlan: string }) => {
  return (
    <div className="bg-white px-10 py-5 rounded-lg xl:px-20 xl:pt-10 xl:pb-16">
      <p className="text-4xl font-black text-center mb-4">
        Reach more people with <span className="text-[#49caa6]">WhyVote</span>
      </p>
      <p className="text-center text-gray-500 mb-16">
        Let more people know more about your prospect!
      </p>
      <div className="flex flex-col items-center">
        {plans.map((plan) => (
          <PlanCard key={plan.planId} plan={plan} currentPlan={currentPlan} />
        ))}
      </div>
    </div>
  )
}

export default Subscriptions

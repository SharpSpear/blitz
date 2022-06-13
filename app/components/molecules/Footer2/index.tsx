import { Link } from "blitz"
import React from "react"

const Footer2 = () => {
  return (
    <div className="bg-black flex flex-col lg:flex-row-reverse p-3 justify-around items-center">
      <div className="flex space-x-9 py-2">
        <Link href="/about">
          <img src={`${process.env.NEXT_PUBLIC_APP_URL}/facebook.svg`} alt="facebook image" />
        </Link>
        <Link href="/about">
          <img
            src={`${process.env.NEXT_PUBLIC_APP_URL}/twitter.svg`}
            alt="twitter image"
            className="mt-1"
          />
        </Link>
        <Link href="/about">
          <img src={`${process.env.NEXT_PUBLIC_APP_URL}/instagram.svg`} alt="instagram image" />
        </Link>
      </div>
      <div className="flex space-x-9 text-white py-2">
        <Link href="/about">
          <p className="no-underline text-white cursor-pointer">About</p>
        </Link>
        <Link href="mailto:know@whyvote.ph">
          <p className="no-underline text-white cursor-pointer">Contact us</p>
        </Link>
        <Link href="/terms-of-service">
          <p className="no-underline text-white cursor-pointer">Terms</p>
        </Link>
      </div>
      <div className="flex text-white py-2">
        {`Copyright @${new Date().getFullYear()}. WhyVote All right reserved.`}
      </div>
    </div>
  )
}

export default Footer2

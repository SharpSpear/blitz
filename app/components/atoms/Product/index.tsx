/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import React from "react"
import { ProductDesc } from "../ProductDesc"
import styles from "./product.module.scss"

const ProductSection: React.FC = ({}) => {
  return (
    <>
      <div
        className={`bg-gray-200  py-24  relative   flex  flex-col md:flex-row space-y-8 items-center w-full h-auto justify-evenly px-20 md:px-0`}
      >
        <div>
          <img src="/images/laptop.png" alt="Laptop" className={styles.productImage} />
        </div>
        <div className={`flex flex-col justify-center  space-y-12  `}>
          <h1 className="text-black font-Neometric font-extrabold text-4xl  md:text-6xl">
            Our <span className="text-primary">Product</span>
          </h1>
          <p className="text-base w-96">
            WhyVote helps you document your startup prospect’s progress and share them with the
            world. Let other people watch history in the making by sharing each record you reach and
            be inspired to aim for bigger goals by watching other startups build their own
            prospects. With WhyVote, you can inspire, and be inspired.
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-Neometric text-4xl md:text-7xl text-center mt-28 font-extrabold">
          Product <span className="text-primary"> Features</span>{" "}
        </h1>
        <div className="flex flex-col space-y-8 md:flex-row px-44 pt-24 justify-between items-center md:items-end">
          <div className="flex flex-col justify-between " style={{ height: "600px" }}>
            <ProductDesc
              img="/images/product/calendar.png"
              text="Track and Document Your Prospect Progress"
            />
            <ProductDesc img="/images/product/planet.png" text="Get Inspiration From Others" />
          </div>
          <div className="hidden  lg:block">
            <Image src="/images/phone.png" alt="phone" width="300px" height="600px" />
          </div>
          <div className="flex flex-col justify-between " style={{ height: "600px" }}>
            <ProductDesc
              img="/images/product/contract.png"
              text="Choose What You Want To Share With Who"
            />
            <ProductDesc
              img="/images/product/home.png"
              text="Handle Multiple Prospects Seamlessly"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export { ProductSection }

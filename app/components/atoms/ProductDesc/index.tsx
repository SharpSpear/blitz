import Image from "next/image"
import React from "react"
import { BlueDot } from "../BlueDot"
import styles from "./product.desc.module.scss"

export type IProductDescProps = {
  text: string
  img
}
const ProductDesc: React.FC<IProductDescProps> = ({ text, img }) => {
  return (
    <div
      className={`shadow-xl p-8 bg-white my-5 lg:w-[360px] w-[280] h-[250] lg:h-[260px] flex flex-col items-center space-y-8`}
    >
      <Image src={img} width="90" height="90" alt="Podcut desc Image" />
      <p className="font-Montserrat text-lg text-center w-56 text-black font-semibold">{text} </p>
    </div>
  )
}

export { ProductDesc }

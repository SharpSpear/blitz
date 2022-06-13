import React from "react"
import styles from "./record.module.scss"
export type IChangeProgressProps = {
  className?: string
}

const ChangeProgress: React.FC<IChangeProgressProps> = ({ className }) => {
  return <div className={`${styles.progress} ${className}`}></div>
}

export { ChangeProgress }

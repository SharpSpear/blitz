import React from "react"
import styles from "./record.module.scss"

export type IChangeCheckpointProps = {
  className?: string
}

const ChangeCheckpoint: React.FC<IChangeCheckpointProps> = ({ className }) => {
  return <div className={`${styles.checkpoint} ${className}`}></div>
}

export { ChangeCheckpoint }

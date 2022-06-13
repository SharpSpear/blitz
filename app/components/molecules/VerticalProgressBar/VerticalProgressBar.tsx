import { ChangeCheckpoint } from "app/components/atoms/change/ChangeCheckpoint"
import React from "react"
import styles from "./VerticalProgressBar.module.scss"
import { ChangeType } from "db"
import Image from "next/image"
import { ProjectIcon, TrackRecordIcon, NewsIcon, EducationIcon, PersonalIcon } from "app/assets"

interface VerticalProgressBarProps {
  typeOfChange?: ChangeType
}

const VerticalProgressBar = ({ typeOfChange }: VerticalProgressBarProps) => {
  const getChangeTypeIcon = (typeOfChange) => {
    switch (typeOfChange) {
      case ChangeType.PROJECT:
        return ProjectIcon
      case ChangeType.TRACKRECORD:
        return TrackRecordIcon
      case ChangeType.NEWS:
        return NewsIcon
      case ChangeType.EDUCATION:
        return EducationIcon
      case ChangeType.PERSONAL:
        return PersonalIcon
      default:
        return TrackRecordIcon
    }
  }

  return (
    <div className="relative max-h-full">
      <div className={styles.progress}></div>
      {typeOfChange && (
        <div
          className={`${styles.checkpoint} z-10 flex justify-center items-center border-4 border-white rounded-full`}
        >
          <Image
            src={getChangeTypeIcon(typeOfChange)}
            alt="change-type-icon"
            layout="fixed"
            width="58"
            height="58"
          />
        </div>
      )}
    </div>
  )
}

export default VerticalProgressBar

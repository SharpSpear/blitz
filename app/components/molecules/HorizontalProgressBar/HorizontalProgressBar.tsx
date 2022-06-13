import { ChangeCheckpoint } from "app/components/atoms/change/ChangeCheckpoint"
import React from "react"
import styles from "./HorizontalProgressBar.module.scss"
import { ChangeType } from "db"
import Image from "next/image"
import { ProjectIcon, TrackRecordIcon, NewsIcon, EducationIcon, PersonalIcon } from "app/assets"

interface HorizontalProgressBarProps {
  typeOfChange?: ChangeType
}

const HorizontalProgressBar = ({ typeOfChange }: HorizontalProgressBarProps) => {
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
          className={`${styles.checkpoint} flex justify-center items-center border-4 border-white rounded-full`}
        >
          <Image
            src={getChangeTypeIcon(typeOfChange)}
            alt="change-type-icon"
            layout="fixed"
            width="64"
            height="64"
          />
        </div>
      )}
    </div>
  )
}

export default HorizontalProgressBar

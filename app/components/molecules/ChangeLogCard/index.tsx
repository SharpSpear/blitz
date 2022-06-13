/* eslint-disable @next/next/no-img-element */
import React from "react"
import Image from "next/image"

import { TrackRecordIcon, ProjectIcon, NewsIcon, PersonalIcon, EducationIcon } from "app/assets"

const ChangeLogCard = ({ type }) => {
  let typeIcon = TrackRecordIcon

  // todo: pass as prop | children
  let content = (
    <div>
      <p className="py-5 font-normal">
        Timmy is starting a company. He wants to document the journey. If it’s easy enough, he will
        add updates regularly. He wants to keep some updates totally private. Some updates, he wants
        to be able to share with the public, but he wants to redact (hide) certain details.
      </p>
      <div className="inline-flex space-x-1 ...">
        <a href="#">
          <img
            alt="Placeholder"
            className="block"
            src="https://picsum.photos/170/114/?random"
            width={170}
            height={114}
          />
        </a>

        <a href="#">
          <img
            alt="Placeholder"
            className="block"
            src="https://picsum.photos/170/114/?random"
            width={170}
            height={114}
          />
        </a>

        <a href="#">
          <img
            alt="Placeholder"
            className="block"
            src="https://picsum.photos/170/114/?random"
            width={170}
            height={114}
          />
        </a>
      </div>
    </div>
  )
  if (type === "project") {
    typeIcon = ProjectIcon
  } else if (type === "news") {
    typeIcon = NewsIcon

    content = (
      <div>
        <p className="py-5 font-normal">
          Timmy is starting a company. He wants to document the journey. If it’s easy enough, he
          will add updates regularly. He wants to keep some updates totally private. Some updates,
          he wants to be able to share with the public, but he wants to redact (hide) certain
          details.
        </p>
      </div>
    )
  }
  return (
    <article
      id="changelogCard"
      className={" overflow-hidden rounded-lg shadow-lg border bg-white p-10"}
    >
      <header className="flex items-center justify-between leading-tight">
        <a className="flex items-center no-underline hover:underline text-black" href="#">
          <img
            alt="Placeholder"
            className="block rounded-full w-10 h-10"
            src="https://picsum.photos/32/32/?random"
            width={32}
            height={32}
          />
          <p className="font-semibold ml-3 text-lg mr-2">WhyVote</p>
          <div className="p-1 ml-2 text-white rounded-full">
            <Image src={typeIcon} alt="" width={36} height={36} />
          </div>
        </a>
        <p className="text-grey-darker text-sm">Dec. 12, 2021</p>
      </header>
      {content}
    </article>
  )
}

export default ChangeLogCard

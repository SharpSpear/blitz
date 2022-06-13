import React, { ReactNode, useState, useEffect } from "react"
import PublicLayout from "app/components/organs/layouts/Default"
import { useQuery } from "blitz"
import ChangeCard, { ChangeCardBody } from "app/components/molecules/ChangeCard"
import RecordCard, { RecordCardBody } from "app/components/molecules/RecordCard1"
import SubHeading from "app/components/atoms/typography/SubHeading"
import MasonryGrid from "app/components/molecules/MasonryGrid"
import AuthLayout from "app/components/organs/layouts/Auth"
import getCurrentUserWithMembership from "app/users/queries/getCurrentUserWithMembership"
import getPublicChanges from "app/records/queries/getPublicChanges"
import { CarbonViewIcon, LinkIcon } from "app/assets"
import { Link, Routes, Image } from "blitz"
import moment from "moment"
import Footer2 from "app/components/molecules/Footer2"

const changeDummyData = [
  {
    imageUrl: "",
    owner: {
      firstName: "Juan",
      lastName: "Luna",
      quote: "Negosyo o Kalayaan? Bayan o Sarili? Pumili ka!",
    },
    updatedAt: new Date(),
  },
  {
    imageUrl: "",
    owner: {
      firstName: "Jose",
      lastName: "Rizal",
      quote:
        "One only dies once, and if one does not die well, a good opportunity is lost and will not present itself again",
    },
    updatedAt: new Date(),
  },
]

const RecordCard1 = (cardData) => {
  return (
    <div className="shadow rounded-md w-full lg:w-[380px] p-3 bg-white">
      <div className="flex">
        {/* <img src={cardData.data.imageUrl} className="rounded-full w-[35px] h-[35px]" alt="avatar" /> */}
        <p className="ml-2 font-Opensans-SemiBol text-[18px]">
          {"@" + cardData.data.owner.firstName + cardData.data.owner.lastName}
        </p>
      </div>
      <div className="mt-2 flex">
        <p className="font-OpenSans text-[14px]">{cardData.data.owner.quote}</p>
      </div>
      <div className="flex mt-2 ">
        <div className="ml-auto">
          <p className="text-gray-500 font-OpenSans-SemiBold text-[12px]">
            {/* {moment(cardData.data.updatedAt).format("ll")} */}
          </p>
        </div>
      </div>
    </div>
  )
}

const DiscoverPage = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  const [user] = useQuery(getCurrentUserWithMembership, null, { staleTime: Infinity })
  const [changes] = useQuery(
    getPublicChanges,
    {
      where: { isPublic: true },
      orderBy: { updatedAt: "desc" },
    },
    {
      staleTime: Infinity,
    }
  )
  const list: ReactNode[] = []
  const list1: ReactNode[] = []
  shuffleArray(changes.changes)
  changes.changes.forEach((exampleChange) => {
    list.push(
      <ChangeCard change={exampleChange}>
        <ChangeCardBody change={exampleChange} />
      </ChangeCard>
    )
    list1.push(
      <RecordCard change={exampleChange}>
        <RecordCardBody change={exampleChange} />
      </RecordCard>
    )
  })
  const authContent = (
    <>
      <div className="flex flex-col lg:flex-row items-center">
        <h3 className="bolder font-Raleway-Bold text-2xl">{`What's up for today?`}</h3>
        <p className="text-[16px] font-Raleway text-black lg:ml-auto lg:mr-5">
          <Link href="/">
            <p className="inline text-gray-500 cursor-pointer">Home</p>
          </Link>
          {" / Prospects"}
        </p>
      </div>
      <hr className="my-3"></hr>
      <div className="flex flex-col items-center">{list1}</div>
    </>
  )
  const content = (
    <div className={"container text-center mx-auto " + (user ? "" : "px-10") + " font-Montserrat"}>
      <div className="p-3 lg:px-[70px] flex flex-col lg:flex-row justify-center items-center">
        <div className="mr-4">
          <p className="font-Raleway-ExtraBold text-[80px] leading-[90px]">
            Know WhyVote! Share WhyVote!
          </p>
          <p className="mt-[17px] font-Opensans-SemiBold text-[20px]">
            Keep up to date with Prospects!
          </p>
        </div>
        <div className="relative">
          <div className="z-10">
            <img className="absolute top-3 " alt="back" src="images/Frame 10.png" />
          </div>
          <div className="relative ml-4 mb-5  z-20">
            <RecordCard1 data={changeDummyData[0]} />
          </div>
          <div className="relative ml-9 lg:ml-[100px] mb-5  z-20">
            <RecordCard1 data={changeDummyData[1]} />
          </div>
        </div>
      </div>
      {/* {user ? (
        <SubHeading className="text-left mb-5 font-Montserrat">Discover New Records</SubHeading>
      ) : (
        <SubHeading>Discover New Prospects</SubHeading>
      )} */}
      <div className="masonry-grid">
        <MasonryGrid padding={!Boolean(user)} cards={list} />
      </div>
    </div>
  )

  return (
    <>
      {user ? (
        <AuthLayout title="WhyVote | Prospects" user={user}>
          {authContent}
        </AuthLayout>
      ) : (
        <PublicLayout title={"WhyVote | Prospects"}>{content}</PublicLayout>
      )}
    </>
  )
}

export default DiscoverPage

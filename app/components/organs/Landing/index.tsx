/* eslint-disable @next/next/no-img-element */
import { Link, Routes, Head, Image } from "blitz"
import { useState } from "react"
import { ProductDesc } from "app/components/atoms/ProductDesc"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { ProjectCard } from "app/components/molecules/DashboardProjectCard"
import { Footer } from "app/components/molecules/Footer/index"
import FooterBottom from "app/components/molecules/FooterBottom"
import { ModalDialog } from "app/components/molecules/ModalDialog"
import SignupPage from "./../../../auth/pages/signup"
import LoginPage from "./../../../auth/pages/login"
import { LandingVote2 } from "../../../assets"
import { LandingVote2Desktop } from "../../../assets"

const Landing = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [signupModal, setSignupModal] = useState(false)
  const [signinModal, setSigninModal] = useState(false)
  return (
    <>
      <Head>
        <title>WhyVote | Home</title>
      </Head>
      {/* <nav className="lg:px-20 font-Montserrat px-8 py-5 lg:py-8 flex justify-between items-center w-full absolute top-0 z-20"> */}
      <nav
        id="home"
        className=" font-Montserrat flex justify-between  pr-3 items-center w-full absolute top-0 z-20"
      >
        <img
          src="/logo.svg"
          className="hidden lg:inline-block"
          alt="logo"
          style={{ width: "280px", marginLeft: "94px", marginTop: "17px" }}
        />
        <img
          src="/logo.svg"
          className="lg:hidden"
          alt="logo"
          style={{ width: "156px", marginLeft: "15px", marginTop: "14px" }}
        />
        <div className="xl:hidden">
          <svg
            onClick={() => {
              setMobileNavOpen(true)
            }}
            width="27"
            height="19"
            viewBox="0 0 27 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.125 18.25H26.625V15.3333H9.125V18.25ZM0.375 10.9583H26.625V8.04167H0.375V10.9583ZM9.125 3.66667H26.625V0.75H9.125V3.66667Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="hidden xl:inline-block mr-20">
          <AnchorLink
            href="#projects"
            className="font-Opensans-SemiBold px-5 no-underline text-white cursor-pointer "
            style={{ fontSize: "16px" }}
          >
            Home
          </AnchorLink>
          <AnchorLink
            href="#about"
            className="font-Opensans-Regular px-5 no-underline text-white cursor-pointer"
            style={{ fontSize: "16px" }}
          >
            About
          </AnchorLink>
          <AnchorLink
            href="#howitswork"
            className="font-Opensans-Regular px-5 no-underline text-white cursor-pointer"
            style={{ fontSize: "16px" }}
          >
            How it works
          </AnchorLink>
          <Link href="/explore">Explore Prospects!</Link>
          <AnchorLink
            href="#contact"
            className="font-Opensans-Regular px-5 no-underline text-white cursor-pointer"
            style={{ fontSize: "16px" }}
          >
            Contact
          </AnchorLink>
          <div
            className="inline-block font-Opensans-SemiBold px-5 no-underline text-white cursor-pointer bg-[#006973] p-2"
            style={{ fontSize: "14px" }}
            onClick={() => setSigninModal(true)}
          >
            Sign in
          </div>
        </div>
        {/* <div className="hidden lg:inline-block">
          <div className="inline-block px-5">
            <div
              className="border border-button inline-block p-2 px-5 text-button cursor-pointer"
              onClick={() => setSignupModal(true)}
            >
              Sign Up
            </div>
          </div>
          <div className="inline-block px-5">
            <div
              className="border border-button bg-button inline-block p-2 px-5 text-white cursor-pointer"
              onClick={() => setSigninModal(true)}
            >
              Log in
            </div>
          </div>
        </div> */}
      </nav>
      {mobileNavOpen && (
        <>
          <div
            onClick={() => {
              setMobileNavOpen(false)
            }}
            className="w-screen overflow-hidden h-screen fixed top-0 z-30  bg-gray-500 opacity-50"
          />
          <div className="h-screen fixed inline-block max-w-80 bg-white z-40 top-0">
            <div className="bg-[#F1F6FF] px-8 py-5">
              <img src="/logo.svg" className="" alt="logo" width="70%" />
            </div>
            <div className="px-8 my-10">
              <AnchorLink
                href="#home"
                className="font-Opensans-Regular py-2 block text-black cursor-pointer "
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setMobileNavOpen(false)
                }}
              >
                Home
              </AnchorLink>
              <AnchorLink
                href="#about"
                className="font-Opensans-Regular py-2 block text-black cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setMobileNavOpen(false)
                }}
              >
                About
              </AnchorLink>
              <AnchorLink
                href="#howitsworkXS"
                className="font-Opensans-Regular py-2 block text-black cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setMobileNavOpen(false)
                }}
              >
                How it works
              </AnchorLink>
              <AnchorLink
                href="#testimonial"
                className="font-Opensans-Regular py-2 block text-black cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setMobileNavOpen(false)
                }}
              >
                Testimonial
              </AnchorLink>
              <AnchorLink
                href="#contactXS"
                className="font-Opensans-Regular py-2 block text-black cursor-pointer"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  setMobileNavOpen(false)
                }}
              >
                Contact
              </AnchorLink>
            </div>
            <div className="text-center absolute bottom-0 w-full pb-20">
              <div
                className="inline-block font-Opensans-SemiBold px-5 no-underline text-white cursor-pointer bg-[#006973] w-[150px]  p-2"
                style={{ fontSize: "14px" }}
                onClick={() => setSigninModal(true)}
              >
                Sign in
              </div>
            </div>
          </div>
        </>
      )}
      {/* content */}
      <img
        src="28494.png"
        alt="landingvote"
        className="lg:hidden z-20"
        style={{ width: "206px", marginLeft: "10%", marginTop: "102px", marginBottom: "-70px" }}
      />
      <div className="flex">
        <img
          src="28494.png"
          alt="landingvote"
          className="hidden lg:block z-20 ml-auto mr-[58%]"
          style={{ width: "340px", marginTop: "156px", marginBottom: "137px" }}
        />
      </div>
      <div
        className="w-full lg:hidden -10 bg-[#1BBD90] px-5"
        style={{ height: "330px", paddingTop: "100px" }}
      >
        <p
          className="font-Raleway-ExtraBold text-white"
          style={{ fontSize: "28px", lineHeight: "33px" }}
        >
          Guiding Filipinos to the right vote!
        </p>
        <p
          className="block mt-4 font-Opensans text-white"
          style={{ fontSize: "14px", lineHeight: "19px" }}
        >
          The perfect place to learn and promote your political prospects. Enlighten yourself
          through countless prospect timelines and delight in on a multitude of features WhyVote
          provides!
        </p>

        <Link href="/explore" passHref>
          <a
            className="block font-Opensans text-white"
            style={{ marginTop: "30px", fontSize: "18px", lineHeight: "25px", fontWeight: 600 }}
          >
            <u>Explore</u>
          </a>
        </Link>
      </div>

      <div
        className="hidden lg:block lg:absolute lg:right-0 lg:w-[63%] lg:top-0 z-10 bg-[#1BBD90]"
        style={{ height: "530px", paddingTop: "171px" }}
      >
        <p
          className="font-Raleway-ExtraBold text-white"
          style={{ fontSize: "54px", lineHeight: "63px", marginLeft: "142px", marginRight: "96px" }}
        >
          Guiding Filipinos to the right vote!
        </p>
        <p
          className="block mt-4 font-Opensans text-white"
          style={{
            fontSize: "16px",
            lineHeight: "22px",
            marginLeft: "142px",
            marginRight: "142px",
          }}
        >
          The perfect place to learn and promote your political prospects. Enlighten yourself
          through countless prospect timelines and delight in on a multitude of features WhyVote
          provides!
        </p>

        <Link href="/explore" passHref>
          <a
            className="block font-Opensans text-white cursor-pointer"
            style={{
              marginTop: "30px",
              marginLeft: "142px",
              fontSize: "18px",
              lineHeight: "25px",
              fontWeight: 600,
            }}
          >
            <u>Explore</u>
          </a>
        </Link>
      </div>
      <div id="about" className="w-full lg:flex">
        <div className="w-full lg:hidden mt-7 ">
          {/* <Image src={LandingVote2 as any} className="w-full" alt="landing vote image" /> */}
          <img src="svg-icons/landingvote2.svg" alt="landing vote image" className="w-full" />
        </div>
        <div className="hidden lg:block">
          <img src="svg-icons/landingvote2-desktop.svg" alt="landing vote image" />
          {/* <Image src={LandingVote2Desktop as any} className="" alt="landing vote image" /> */}
        </div>
        <div className="mt-7 w-full lg:w-[55%] px-4 ">
          <p
            className="font-Raleway-ExtraBold text-black mt-7 hidden lg:block"
            style={{ fontSize: "50px", lineHeight: "59px", fontWeight: 800 }}
          >
            WhyVote is about...
          </p>
          <p
            className="font-Raleway-ExtraBold text-black mt-7 lg:hidden block"
            style={{ fontSize: "28px", lineHeight: "59px", fontWeight: 800 }}
          >
            WhyVote is about...
          </p>
          <p
            className="font-Opensans text-black mt-3 lg:hidden block "
            style={{ fontSize: "14px", lineHeight: "30px" }}
          >
            WhyVote is a digital library, housing everything there is to know about
            Philippine&apos;s political prospect, parties, their histories, plans, and much more. We
            aim to function as a house of political prospect understanding for Filipino&apos;s to
            increase their knowledge base regarding their country. And thus, make wiser votes
            accounting for the future of their country. And most importantly . . .so they may
            understand the value of voting the right prospect. Hence the name; <b>WhyVote.</b>{" "}
            <br></br>
            <br></br>
            As for the information itself, it varies in genres and categories. For example, you can
            learn about,
          </p>
          <p
            className="font-Opensans text-black mt-3 hidden lg:block"
            style={{ fontSize: "16px", lineHeight: "30px" }}
          >
            WhyVote&apos;s mission is to house everything there is to know about Philippine&apos;s
            political prospects, parties, their achievements, projects, histories, plans, and much
            more.
            <br></br>
          </p>
          <p
            className="font-Opensans text-black mt-5 hidden lg:block"
            style={{ fontSize: "16px", lineHeight: "25px" }}
          >
            <b>Know WhyVote! Tell WhyVote!</b> about your prospects...
          </p>
          <p
            className="font-Opensans text-black mt-5 block lg:hidden"
            style={{ fontSize: "14px", lineHeight: "25px" }}
          >
            <b>Know WhyVote! Tell WhyVote!</b> about your prospects...
          </p>
          <ul className="mt-5 lg:hidden">
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              <b>Projects</b> - Projects done by your prospect
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              <b>Track Record </b>- This shows what the prospect did at a particular time.
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              <b>News</b> - Latest news reports
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              <b>Education</b> - Educational-related happenings of your prospect.
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              <b>Personal</b> - Tells regular, life-related events of your prospect.
            </li>
          </ul>

          <ul className="mt-5 hidden lg:block">
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "16px", lineHeight: "25px" }}
            >
              <b>Projects</b> - Projects done by your prospect
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "16px", lineHeight: "25px" }}
            >
              <b>Track Record </b>- This shows what the prospect did at a particular time.{" "}
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "16px", lineHeight: "25px" }}
            >
              <b>News</b> - Latest news reports{" "}
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "16px", lineHeight: "25px" }}
            >
              <b>Education</b> - Educational-related happenings of your prospect.{" "}
            </li>
            <li
              className="font-Opensans text-black"
              style={{ fontSize: "16px", lineHeight: "25px" }}
            >
              <b>Personal</b> - Tells regular, life-related events of your prospect.{" "}
            </li>
          </ul>
        </div>
        <div className="ml-auto lg:block hidden">
          <img
            src="Group 9.png"
            alt="group 9"
            style={{ marginTop: "60px", width: "90px", height: "225px" }}
          ></img>
        </div>
      </div>
      <div className="flex w-full lg:hidden">
        <div className="ml-auto">
          <img
            src="Group 9.png"
            alt="group 9"
            style={{ marginTop: "-60px", width: "60px", height: "151px", marginBottom: "-40px" }}
          ></img>
        </div>
      </div>
      <div id="howitswork" className="lg:mt-9 hidden lg:block">
        <p
          className="font-Raleway-ExtraBold text-center text-black hidden lg:block"
          style={{ fontSize: "50px", lineHeight: "59px", marginTop: "20px", fontWeight: 800 }}
        >
          How it works
        </p>
        <div
          className="flex justify-center"
          style={{ paddingLeft: "100px", paddingRight: "100px" }}
        >
          <div
            className="m-3 bg-[#1BBD90]"
            style={{ paddingTop: "50px", height: "500px", marginTop: "50px" }}
          >
            <p
              className="font-Raleway-ExtraBold text-white ml-5 mt-7"
              style={{ fontSize: "35px", lineHeight: "26px" }}
            >
              Step 1. Register to WhyVote and create your own Prospect
            </p>
            <p
              className="font-Opensans-SemiBold text-white px-5 mt-5"
              style={{ fontSize: "16px", lineHeight: "30px" }}
            >
              The first step is pretty simple. Sign up to WhyVote and go ahead and get started on
              making your prospect. This chosen topic would be your primary theme and about which
              your whole account would base. The prospect itself could be any political party,
              politician, government, etc. It all really depends upon you. Go to “Create New
              Prospect” on WhyVote and fill in the contents required. These include the
              project&apos;s name, the slug, the fact that you want the prospect to be private or
              public, etc. Choose a suitable party and add the necessary social media links to
              optimize a reader&apos;s experience with your prospect.
            </p>
          </div>
          <div
            className="m-3 bg-[#1BBD90]"
            style={{ paddingTop: "50px", height: "500px", marginTop: "40px" }}
          >
            <p
              className="font-Raleway-ExtraBold text-white ml-5 mt-7"
              style={{ fontSize: "35px", lineHeight: "26px" }}
            >
              Step 2: Start Writing
            </p>
            <p
              className="font-Opensans-SemiBold text-white px-5 mt-5"
              style={{ fontSize: "16px", lineHeight: "30px" }}
            >
              For step two of this 3-step process, you should now start writing about your prospect.
              Include everything there is to know. For example, a WhyVote timeline could go a long
              way in conveying the correct information. Or you could talk about your prospect&apos;s
              goals, ambitions, and how they plan on achieving them. A tip when you&apos;re writing
              . . .make sure you incorporate the projects and objectives accomplished by this
              organization or influencer as that has a significant impact on readers. For this,
              create different records on WhyVote that itself includes a variety. Like, projects,
              education, personal life, news and etc.
            </p>
          </div>
          <div
            className="m-3 bg-[#1BBD90]"
            style={{ paddingTop: "50px", height: "500px", marginTop: "50px" }}
          >
            <p
              className="font-Raleway-ExtraBold text-white ml-5 mt-7"
              style={{ fontSize: "35px", lineHeight: "26px" }}
            >
              Step 3: Share your Prospects
            </p>
            <p
              className="font-Opensans-SemiBold text-white px-5 mt-5"
              style={{ fontSize: "16px", lineHeight: "30px" }}
            >
              The final step is to publish your work and share it as much as possible to increase
              its popularity and get the word across. Publishing your prospect can help others find
              the truth behind a particular subject. Likewise, you can also use this as a way to
              show your devotion towards an influencing party. Or . . .to use this platform, and
              your prospect, to shed truth on what is actually happening. Your mind is your only
              limitation.
            </p>
          </div>
        </div>
      </div>
      <div id="howitsworkXS" className="lg:mt-9 lg:hidden">
        <p
          className="font-Raleway-ExtraBold text-center text-black "
          style={{ fontSize: "28px", lineHeight: "33px", marginTop: "20px", fontWeight: 800 }}
        >
          How it works
        </p>
        <div className="m-4 mt-6 bg-[#1BBD90]" style={{ paddingTop: "50px", height: "313px" }}>
          <p
            className="font-Raleway-ExtraBold text-white ml-5 mt-7"
            style={{ fontSize: "28px", lineHeight: "26px" }}
          >
            Step 1. Register to WhyVote and create your own Prospect
          </p>
          <p
            className="font-Opensans-SemiBold text-white px-5 mt-5"
            style={{ fontSize: "16px", lineHeight: "30px" }}
          ></p>
        </div>
        <div className="m-4 mt-6 bg-[#1BBD90]" style={{ paddingTop: "50px", height: "313px" }}>
          <p
            className="font-Raleway-ExtraBold text-white ml-5 mt-7"
            style={{ fontSize: "28px", lineHeight: "26px" }}
          >
            Step 2: Start Writing
          </p>
          <p
            className="font-Opensans-SemiBold text-white px-5 mt-5"
            style={{ fontSize: "16px", lineHeight: "30px" }}
          ></p>
        </div>
        <div className="m-4 mt-6 bg-[#1BBD90]" style={{ paddingTop: "50px", height: "313px" }}>
          <p
            className="font-Raleway-ExtraBold text-white ml-5 mt-7"
            style={{ fontSize: "28px", lineHeight: "26px" }}
          >
            Step 3: Share your Prospects
          </p>
          <p
            className="font-Opensans-SemiBold text-white px-5 mt-5"
            style={{ fontSize: "16px", lineHeight: "30px" }}
          ></p>
        </div>
      </div>
      <div className="lg:flex hidden w-full">
        <div className="mr-auto">
          <img src="svg-icons/rectgroup.svg" style={{ marginBottom: "-60px" }} alt="rects" />
        </div>
      </div>
      <div id="testimonial" className="relative flex flex-col justify-end items-center">
        <img
          src="svg-icons/curve.svg"
          className="w-full"
          alt="vector"
          style={{ marginTop: "54px" }}
        />
        <div className="w-full bg-[#1BBD90] px-3 lg:hidden" style={{ height: "470px" }} />
        <div className="w-full bg-[#1BBD90] px-3 hidden lg:block" style={{ height: "300px" }} />
        <div
          className="absolute flex justify-center items-center flex-col lg:flex-row-reverse"
          style={{ marginLeft: "30px", marginRight: "30px" }}
        >
          <img
            src="4448 1.png"
            alt="4448 1.png"
            className="w-[70%]"
            style={{ marginTop: "50px", paddingTop: "30px" }}
          />
          <div style={{ marginTop: "50px", paddingTop: "30px" }}>
            <p
              className="font-Raleway-ExtraBold text-center text-black mt-3 lg:hidden"
              style={{ fontSize: "28px", lineHeight: "40px" }}
            >
              Register now to WhyVote!
            </p>
            <p
              className="font-Raleway-ExtraBold text-left text-black mt-3 hidden lg:block"
              style={{ fontSize: "45px", lineHeight: "60px" }}
            >
              Register now to WhyVote!
            </p>
            <p
              className="font-Opensans-SemiBold text-black px-5 mt-2 text-center lg:hidden"
              style={{ fontSize: "14px", lineHeight: "23px" }}
            >
              There&apos;s literally no reason to skip this opportunity. You&apos;re just one step
              away from a boundaryless library of political knowledge about prospects. So, what are
              you waiting for?!
            </p>
            <p
              className="font-Opensans-SemiBold text-black px-5 mt-2 text-left hidden lg:block"
              style={{ fontSize: "16px", lineHeight: "23px" }}
            >
              There&apos;s literally no reason to skip this opportunity. You&apos;re just one step
              away from a boundaryless library of political knowledge about prospects. So, what are
              you waiting for?!
            </p>
            <div className="flex lg:justify-start justify-center mt-6">
              <button
                className="border-black font-Opensans-SemiBold text-black px-4 py-1"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "23px",
                  border: "1.5px solid black",
                  boxShadow: "insert 0px -6px 0px black",
                  borderRadius: "3px",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  boxSizing: "border-box",
                }}
              >
                <a href="/signup">Register Now!</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="contactXS" className="p-3 mt-3 lg:hidden">
        <p className="font-Raleway-ExtraBold mt-6" style={{ fontSize: "54px", lineHeight: "63px" }}>
          Contact us
        </p>
        <p className="mt-2 font-Opensans-SemiBold" style={{ fontSize: "14px", lineHeight: "25px" }}>
          Ask us any questions you like. Reach us to at at know@whyvote.ph.
        </p>

        {/* <p
          className="font-Opensans-ExtraBold mt-9"
          style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
        >
          Name
        </p>
        <input
          className="focus:outline-none border-2 border-black w-full"
          style={{ height: "50px" }}
        ></input>
        <p
          className="font-Opensans-ExtraBold mt-9"
          style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
        >
          Email
        </p>
        <input
          className="focus:outline-none border-2 border-black w-full"
          style={{ height: "50px" }}
        ></input>
        <p
          className="font-Opensans-ExtraBold mt-9"
          style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
        >
          Subject
        </p>
        <input
          className="focus:outline-none border-2 border-black w-full"
          style={{ height: "50px" }}
        ></input>
        <p
          className="font-Opensans-ExtraBold mt-9"
          style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
        >
          Message
        </p>
        <textarea
          className="focus:outline-none border-2 border-black w-full"
          style={{ height: "158px" }}
        ></textarea>
        <div className="flex justify-center">
          <button
            className="border-black p-2 mx-auto"
            style={{ borderWidth: "2px", marginTop: "30px", height: "43px", width: "43px" }}
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.375 6.99989C0.375 6.81755 0.447433 6.64269 0.576364 6.51376C0.705295 6.38483 0.880164 6.31239 1.0625 6.31239H17.2779L12.9508 1.98664C12.8217 1.85755 12.7491 1.68246 12.7491 1.49989C12.7491 1.31733 12.8217 1.14224 12.9508 1.01314C13.0798 0.884048 13.2549 0.811523 13.4375 0.811523C13.6201 0.811523 13.7952 0.884048 13.9242 1.01314L19.4242 6.51314C19.4883 6.577 19.5391 6.65287 19.5737 6.7364C19.6084 6.81992 19.6262 6.90946 19.6262 6.99989C19.6262 7.09032 19.6084 7.17986 19.5737 7.26339C19.5391 7.34691 19.4883 7.42278 19.4242 7.48664L13.9242 12.9866C13.7952 13.1157 13.6201 13.1883 13.4375 13.1883C13.2549 13.1883 13.0798 13.1157 12.9508 12.9866C12.8217 12.8575 12.7491 12.6825 12.7491 12.4999C12.7491 12.3173 12.8217 12.1422 12.9508 12.0131L17.2779 7.68739H1.0625C0.880164 7.68739 0.705295 7.61496 0.576364 7.48603C0.447433 7.3571 0.375 7.18223 0.375 6.99989Z"
                fill="black"
              />
            </svg>
          </button>
        </div> */}
      </div>
      <div
        id="contact"
        className=" mt-3 hidden lg:block"
        style={{
          paddingTop: "78px",
          paddingLeft: "120px",
          paddingBottom: "90px",
          paddingRight: "120px",
        }}
      >
        <img src="svg-icons/rectscontact.svg" alt="rects contact" className="absolute right-0" />
        <p className="font-Raleway-ExtraBold" style={{ fontSize: "74px", lineHeight: "87px" }}>
          Contact us
        </p>
        <p
          className="mt-2 font-Opensans-SemiBold"
          style={{ fontSize: "16px", lineHeight: "30px", width: "570px" }}
        >
          Ask us any questions you like. Reach us to at at know@whyvote.ph.
        </p>
        {/* <div className="grid grid-cols-2 gap-4">
          <div>

          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="font-Opensans-ExtraBold mt-9"
                  style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
                >
                  Name
                </p>
                <input
                  className="focus:outline-none border-2 border-black w-full"
                  style={{ height: "50px" }}
                ></input>
              </div>
              <div>
                <p
                  className="font-Opensans-ExtraBold mt-9"
                  style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
                >
                  Email
                </p>
                <input
                  className="focus:outline-none border-2 border-black w-full"
                  style={{ height: "50px" }}
                ></input>
              </div>
            </div>

            <p
              className="font-Opensans-ExtraBold mt-9"
              style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
            >
              Subject
            </p>
            <input
              className="focus:outline-none border-2 border-black w-full"
              style={{ height: "50px" }}
            ></input>
            <p
              className="font-Opensans-ExtraBold mt-9"
              style={{ fontSize: "16px", lineHeight: "30px", fontWeight: 800 }}
            >
              Message
            </p>
            <textarea
              className="focus:outline-none border-2 border-black w-full"
              style={{ height: "158px" }}
            ></textarea>
            <div className="flex justify-center">
              <button
                className="border-black p-2 mx-auto"
                style={{ borderWidth: "2px", marginTop: "30px", height: "43px", width: "43px" }}
              >
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.375 6.99989C0.375 6.81755 0.447433 6.64269 0.576364 6.51376C0.705295 6.38483 0.880164 6.31239 1.0625 6.31239H17.2779L12.9508 1.98664C12.8217 1.85755 12.7491 1.68246 12.7491 1.49989C12.7491 1.31733 12.8217 1.14224 12.9508 1.01314C13.0798 0.884048 13.2549 0.811523 13.4375 0.811523C13.6201 0.811523 13.7952 0.884048 13.9242 1.01314L19.4242 6.51314C19.4883 6.577 19.5391 6.65287 19.5737 6.7364C19.6084 6.81992 19.6262 6.90946 19.6262 6.99989C19.6262 7.09032 19.6084 7.17986 19.5737 7.26339C19.5391 7.34691 19.4883 7.42278 19.4242 7.48664L13.9242 12.9866C13.7952 13.1157 13.6201 13.1883 13.4375 13.1883C13.2549 13.1883 13.0798 13.1157 12.9508 12.9866C12.8217 12.8575 12.7491 12.6825 12.7491 12.4999C12.7491 12.3173 12.8217 12.1422 12.9508 12.0131L17.2779 7.68739H1.0625C0.880164 7.68739 0.705295 7.61496 0.576364 7.48603C0.447433 7.3571 0.375 7.18223 0.375 6.99989Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}
      </div>
      <div id="footer" className="mt-4 bg-[#000]">
        <div className="flex flex-col lg:flex-row lg:justify-center mx-15 lg:mx-225">
          <p
            className="hidden lg:block text-left text-white font-Raleway-ExtraBold mt-6"
            style={{ fontSize: "36px", lineHeight: "43px", width: "420px" }}
          >
            Don&apos;t miss any updates <br />
            Get Subscribed!
          </p>
          <p
            className="lg:hidden text-center text-white font-Raleway-ExtraBold mt-6"
            style={{ fontSize: "28px", lineHeight: "35px" }}
          >
            Don&apos;t miss any updates <br />
            Get Subscribed!
          </p>

          <div className="flex mx-3" style={{ marginTop: "30px" }}>
            <input
              className="focus:outline-none border-2 border-white bg-black px-2 font-Opensans-SemiBold w-full text-white border-r-0"
              placeholder=" Enter your email"
              style={{ height: "70px" }}
            ></input>
            <div className="border-2 border-white px-2 py-5 border-l-0" style={{ height: "70px" }}>
              <svg
                width="79"
                height="24"
                viewBox="0 0 79 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M78.0607 13.0607C78.6464 12.4749 78.6464 11.5251 78.0607 10.9393L68.5147 1.3934C67.9289 0.807617 66.9792 0.807617 66.3934 1.3934C65.8076 1.97919 65.8076 2.92894 66.3934 3.51472L74.8787 12L66.3934 20.4853C65.8076 21.0711 65.8076 22.0208 66.3934 22.6066C66.9792 23.1924 67.9289 23.1924 68.5147 22.6066L78.0607 13.0607ZM-1.31134e-07 13.5L77 13.5L77 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col lg:flex-row w-full justify-between items-start mt-[100px] lg:mt-[70px] pl-[16px] lg:pl-[140px] pr-[16px] lg:pr-[220px]"

          // style={{ marginTop: "100px", paddingLeft: "140px", paddingRight: "220px" }}
        >
          <div className="">
            <img
              src="/logo_white.svg"
              className=""
              alt="logo_white"
              style={{ width: "265.5px", marginTop: "" }}
            />
            <p
              className="mt-3 font-Opensans text-white lg:hidden"
              style={{ fontSize: "14px", lineHeight: "25px" }}
            >
              Guiding Filipinos to the right vote!
            </p>
            <p
              className="mt-3 font-Opensans text-white hidden lg:block"
              style={{ fontSize: "16px", lineHeight: "25px", width: "400px" }}
            >
              Guiding Filipinos to the right vote!
            </p>
          </div>

          <div>
            <p
              className="mt-9 lg:mt-5 mb-5 text-white font-Raleway-ExtraBold"
              style={{ fontSize: "24px", lineHeight: "30px", fontWeight: 800 }}
            >
              Connect with us
            </p>
            <div className="flex space-x-9">
              <img src="facebook.svg" alt="facebook image" />
              <img src="twitter.svg" alt="twitter image" className="mt-1" />
              <img src="instagram.svg" alt="instagram image" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:items-end lg:pl-[140px] lg:pr-[150px] pb-5">
          <AnchorLink href="#home">
            <div className="flex flex-col lg:flex-row-reverse lg:justify-center lg:items-end">
              <div className="flex justify-center" style={{ marginTop: "150px" }}>
                <img src="arrowup.svg" alt="arrow up" />
              </div>
              <div className="flex justify-center mt-2">
                <p
                  className="font-Opensans-SemiBold text-white"
                  style={{ fontSize: "15px", lineHeight: "20px" }}
                >
                  Back to Top
                </p>
              </div>
            </div>
          </AnchorLink>
          <div className="flex justify-center mt-4">
            <p
              className="font-Opensans-SemiBold text-white"
              style={{ fontSize: "12px", lineHeight: "16px" }}
            >
              {`Copyright @${new Date().getFullYear()}. All right reserved`}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="relative w-full h-96 mb-24 lg:mb-0 bg-white">
        <div className="left-[15%] bottom-40 lg:top-32 w-32 lg:w-56 lg:right-[58%] lg:left-auto z-10 absolute">
          <img src="28494.png" alt="landingvote" />
        </div>
        <div className="h-72 w-full top-48 lg:h-96 bg-[#1BBD90] lg:w-[63%] absolute lg:top-0 lg right-0 z-0 p-5">
          <p
            className="mt-7 lg:mt-0 font-Raleway-ExtraBold lg:text-4xl text-white"
            style={{ fontSize: "28px" }}
          >
            Lorem Ipsum is simply dummy text
          </p>
        </div>
      </div>
      <div className="bg-white px-5 lg:px-16">
        <section className="grid grid-cols-12 items-center overflow-hidden">
          <div className="lg:col-span-5 mt-5 order-2 lg:order-1 col-span-full font-Montserrat w-[70%]">
            <h3 className="text-[36px] lg:text-[64px] font-Montserrat bold">Log Your</h3>
            <h3 className="text-[36px] lg:text-[64px] font-Montserrat bold text-button">Journey</h3>
            <p className="my-32">
              Keep the track of your business progress by saving the data to the timeline.{" "}
            </p>
            <div
              className="bg-button cursor-pointer text-white w-[200px] text-center h-[44px] justify-center flex items-center "
              onClick={() => setSignupModal(true)}
            >
              Get Started
            </div>
          </div>
          <div className="lg:col-span-7 col-span-full order-1 lg:order-2">
            <img src="/images/landing.png" width="100%" height="100%" alt="" />
          </div>
        </section>
        <section id="projects" className="py-10 lg:mx-5">
          <h3 className="text-[36px] lg:text-[64px] font-Montserrat bold">
            Discover <span className="bold text-button">Prospects</span>
          </h3>
          <div className="grid grid-cols-12 gap-y-5">
            <ProjectCard image="/images/prospect/1.png" />
            <ProjectCard image="/images/prospect/2.png" />
            <ProjectCard image="/images/prospect/3.png" />
            <ProjectCard image="/images/prospect/4.png" />
          </div>
          <div className="block py-10 w-full text-center">
            <Link href="/discover">
              <div className="bg-button cursor-pointer w-[200px] h-[44px] mx-auto flex justify-center items-center text-white">
                See More
              </div>
            </Link>
          </div>
        </section>
      </div>
      <section id="product" className="bg-[#E8ECF2] py-10 px-5 lg:px-16">
        <div className="grid grid-cols-12 gap-y-5">
          <div className="col-span-full lg:col-span-6">
            <img src="/images/laptop.png" alt="" />
          </div>
          <div className="col-span-full lg:col-span-6">
            <div className="lg:w-[70%] lg:pl-12">
              <h3 className="text-[36px] lg:text-[64px] font-Montserrat bold">
                Our <span className="font-Montserrat bold text-button">Product</span>
              </h3>
              <p className="pt-10">
                WhyVote helps you document your startup project&apos;s progress and share them with the
                world. Let other people watch history in the making by sharing each record you reach
                and be inspired to aim for bigger goals by watching other startups build their own
                projects. With WhyVote, you can inspire, and be inspired.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="product-features" className="bg-white py-16 lg:p-16">
        <h3 className="text-[36px] text-center lg:text-[64px] font-Montserrat bold">
          Product <span className="font-Montserrat bold text-button">Features</span>
        </h3>
        <div className="grid mx-auto grid-cols-12 gap-y-5">
          <div className="col-span-full mx-auto lg:col-span-4">
            <ProductDesc
              img="/images/product/calendar.png"
              text="Track and Document Your Project Progress"
            />
            <ProductDesc img="/images/product/planet.png" text="Get Inspiration From Others" />
          </div>
          <div className="col-span-full lg:col-span-4 hidden lg:inline-block">
            <img src="/images/phone.png" className="mx-auto" alt="" />
          </div>
          <div className="col-span-full mx-auto lg:col-span-4">
            <ProductDesc
              img="/images/product/contract.png"
              text="Choose What You Want To Share With Who"
            />
            <ProductDesc
              img="/images/product/home.png"
              text="Handle Multiple Projects Seamlessly"
            />
          </div>
        </div>
      </section> */}
      <ModalDialog open={signupModal} onClose={() => setSignupModal(false)}>
        <SignupPage isModal={true} />
      </ModalDialog>
      <ModalDialog open={signinModal} onClose={() => setSigninModal(false)}>
        <LoginPage />
      </ModalDialog>

      {/* <Footer />  */}
    </>
  )
}

export default Landing

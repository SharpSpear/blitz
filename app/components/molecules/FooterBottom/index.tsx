import { Image } from "blitz"
const FooterBottom = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row px-40 justify-between bg-primary -mt-6 py-5  pb-10 md:pb-1 items-center">
      <h1 className="w-80 text-white">© 2021 WhyVote. All rights reserved</h1>
      <div className="flex space-x-2 justify-center ">
        <a href="https://www.instagram.com/">
          <Image
            src="/svg-icons/white-instagram.png"
            width="24px"
            height="24px"
            alt="Social icon"
          />
        </a>
        <a href="https://www.facebook.com/">
          <Image src="/svg-icons/white-facebook.png" width="24px" height="24px" alt="Social icon" />
        </a>
        <a href="https://www.twitter.com/">
          <Image src="/svg-icons/white-twitter.png" width="24px" height="24px" alt="Social icon" />
        </a>
        <a href="https://www.youtube.com/">
          <Image src="/svg-icons/white-youtube.png" width="24px" height="24px" alt="Social icon" />
        </a>
      </div>
      <div
        className=" m-auto md:hidden w-32 h-1 bg-white  "
        style={{ borderRadius: "100px" }}
      ></div>
    </div>
  )
}

export default FooterBottom

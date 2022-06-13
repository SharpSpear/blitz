import Navbar from "app/components/organs/layouts/Default/Navbar"
import Sidebar from "app/components/organs/layouts/Default/Sidebar"
import MobileNavigation from "app/components/organs/layouts/navigation/mobile-navigation"
import { Footer } from "app/components/molecules/Footer/index"
import FooterBottom from "app/components/molecules/FooterBottom"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { UIProvider } from "app/contexts/ui.context"
import path from "path"
import { Head } from "blitz"
import AuthLayout from "app/components/organs/layouts/Auth"
import {
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
  useRouter,
  Routes,
  useMutation,
} from "blitz"
import getCurrentUserServer from "app/users/queries/getCurrentUserServer"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Ensure these files are not eliminated by trace-based tree-shaking (like Vercel)
  // https://github.com/blitz-js/blitz/issues/794
  path.resolve("next.config.js")
  path.resolve("blitz.config.js")
  path.resolve(".next/__db.js")
  // End anti-tree-shaking

  const user = await getCurrentUserServer({ ...context })
  if (user) {
    return { props: { user: user } }
  } else {
    return {
      redirect: {
        destination: "/login?next=settings",
        permanent: false,
      },
      props: {},
    }
  }
}
const PrivacyPolicy = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AuthLayout title={"Privacy Policy"} user={user}>
      <div id="content" className="z-40">
        <div className="items-center break-words justify-center bg-white pt-20">
          <div className="p-10 sm:py-20 sm:px-24 bg-white">
            <h4 className="font-Montserrat bold font-extrabold text-5xl">
              <span className="text-[#1bcd90] bold">Privacy</span> Policy
            </h4>
            <div className="my-20 font-Montserrat">
              <section>
                <p className="block my-5">
                  1. All personal information (such as addresses, email, phone number, etc.)
                  collected will be secured and maintained by WhyVote. <br></br>
                  2. Data collected may be used to analyze and optimize a user&apos;s experience on
                  the site. <br></br>
                  3. Data provided is voluntary. However, less information decreases efficient user
                  experience. <br></br>
                  4. The collected information includes the users ISP, the web browser or OS, IP
                  address, and other site-related information. <br></br>
                  5. WhyVote uses cookies to enhance a users experience. And it does not infiltrate
                  the user&apos;s hard drive. <br></br>
                  6. WhyVote securely holds the user&apos;s private data and establishes complete
                  transparency. <br></br>
                  7. Personal information may correlate to WhyVotes general announcements,
                  notifications, etc. And these would correspond to the mass users interests.{" "}
                  <br></br>
                  8. The privacy policy may change from time to time due to a change of times,
                  users, and site usage. <br></br>
                  9. WhyVote utilizes advanced methods for data protection. However, a 100%
                  guarantee is an impossibility. <br></br>
                  10. The users should input data in a way that prevents third parties from
                  accessing their information. Furthermore, they should display extra care in not
                  disclosing personal information to other users while interacting with them on
                  WhyVote.
                  <br></br>
                </p>
              </section>
            </div>
          </div>
          <Footer />
          <FooterBottom />
        </div>
      </div>
    </AuthLayout>
  )
}

export default PrivacyPolicy

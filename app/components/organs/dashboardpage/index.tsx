import React from "react"
import { useQuery, Image, Link, Routes } from "blitz"
import PersonalProjectCard, {
  DiscoverProjectCard,
} from "app/components/molecules/DashboardProjectCard"
import Onboarding from "app/components/organs/Onboarding"
import getProjects from "app/prospects/queries/getProjects"
import getParties from "app/prospects/queries/getParties"
import ModalDialog from "app/components/molecules/ModalDialog"

const DashboardPage = ({ user }) => {
  const [projectsData, { refetch }] = useQuery(getProjects, { where: { ownerId: user.id } })
  const { projects } = projectsData
  const [allProjectsData] = useQuery(getProjects, {
    where: { OR: [{ ownerId: null }, { NOT: { ownerId: user.id } }], isPublic: true },
  })
  const [parties] = useQuery(getParties, {})
  const { projects: allProjects } = allProjectsData
  let list: JSX.Element[] = []
  let listOrder: JSX.Element[] = []

  projects.forEach((project, i) => {
    list.push(<PersonalProjectCard key={i} project={project} refetch={refetch} />)
  })
  allProjects.forEach((project, i) => {
    listOrder.push(<DiscoverProjectCard key={i} project={project} />)
  })

  const [showOnboarding, setShowOnboarding] = React.useState(projects.length === 0)
  const [addParty, setAddParty] = React.useState(false)

  return (
    <>
      {!user.onboarded && (
        <Onboarding
          showOnboarding={showOnboarding}
          setShowOnboarding={setShowOnboarding}
          user={user}
        />
      )}
      {projects.length ? (
        <>
          <h3 className="bolder font-Raleway-Bold text-2xl">My Prospect</h3>
          <p className="text-[16px] font-Raleway text-black absolute right-20">
            <Link href="/">
              <p className="inline text-gray-500 cursor-pointer">Home</p>
            </Link>
            {" / My prospect"}
          </p>
          <section className="sm:max-w-80- ">
            <div>
              <div className="grid auto-cols-max grid-cols-12 gap-x-3 gap-y-3 pt-7 pb-3 mb-3">
                {list}
              </div>
            </div>
            <Link href={Routes.NewProjectPage()} passHref>
              <a className="mt-9 text-white bg-[#1BBD90] px-4 py-2 rounded-sm hover:bg-green-700">
                New Prospect
              </a>
            </Link>

            <div className="mt-14">
              <h3 className="bolder font-Raleway-Bold text-2xl">Other Prospects</h3>
              <div className="grid auto-cols-max grid-cols-12 gap-x-3 gap-y-3 pt-7 pb-3 mb-3">
                {listOrder}
              </div>
            </div>

            <div className="mt-14">
              <h3 className="bolder font-Raleway-Bold text-2xl">Parties</h3>
              <div className="flex flex-wrap pt-7 pb-3 mb-3 items-center">
                {parties.map((party) => (
                  <>
                    <img
                      src={party.partyLogo}
                      alt="party logo"
                      key={party.partyName}
                      loading="lazy"
                      width="150px"
                      height="auto"
                      style={{ marginRight: "30px" }}
                    />
                  </>
                ))}
              </div>
            </div>

            <a
              className="mt-9 text-white bg-[#1BBD90] px-4 py-2 rounded-sm hover:bg-green-700"
              onClick={() => setAddParty(true)}
            >
              Add Party
            </a>
          </section>
          <ModalDialog open={addParty} onClose={() => setAddParty(false)}>
            <div className="flex justify-center">
              <div className=" shadow-lg bg-white p-8 w-[500px] ">
                <p className="text-[18px]">
                  This functionality needs validation. Contact us at <u>know@whyvote.ph</u> to
                  register your party.
                </p>
                <div className="flex justify-center">
                  <div
                    onClick={() => setAddParty(false)}
                    className="bg-[#1BBD90] p-4 w-[130px] mt-3 text-white cursor-pointer text-center"
                  >
                    OK
                  </div>
                </div>
              </div>
            </div>
          </ModalDialog>
        </>
      ) : (
        <div className="text-center">
          <div className="clear-both" />
          <div className="grid grid-cols-12">
            <div className="col-span-full sm:order-1 order-3">
              <h1 className="font-semibold pt-7 text-3xl sm:text-4xl">Nothing to see here...</h1>
              <p className="text-lg font-medium">
                You can
                <Link href={Routes.NewProjectPage()} passHref>
                  <b>
                    <a className=""> create </a>
                  </b>
                </Link>
                on now! or
                <Link href="/explore">
                  <b>
                    <a className=""> view how the other aspects are doing</a>{" "}
                  </b>
                </Link>
              </p>
            </div>
            {/* <div className="col-span-full order-2">
              <Image width="630px" height="550px" src="/no_project.png" alt="No projects" />
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardPage

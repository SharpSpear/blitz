import React from "react"
import Image from "next/image"
import { Head, useQuery, useParam } from "blitz"
import getPublicProject from "app/prospects/queries/getPublicProject"
import getPublicChanges from "app/records/queries/getPublicChanges"
import ProjectCard from "app/components/molecules/ProjectCard"
import ChangeTimelineDesktop from "app/prospects/components/ChangeTimelineDesktop"
import ChangeTimelineMobile from "app/prospects/components/ChangeTimelineMobile"
import Footer2 from "app/components/molecules/Footer2"

const PublicProject = () => {
  const slug = useParam("slug", "string") || ""
  const [project] = useQuery(getPublicProject, { slug })
  const [changes] = useQuery(getPublicChanges, {
    where: { prospectId: project.id },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <div className="container relative ">
        <img
          className="absolute top-[-60px]  z-10"
          alt="back"
          src={`${process.env.NEXT_PUBLIC_APP_URL}/images/Frame 10.png`}
        />

        <div className="mr-4 ml-[60px] relative z-20  lg:mt-[30px] min-h-[300px]">
          <p className="font-Raleway-ExtraBold text-[40px] lg:text-[80px] ">
            A publicized prospect is here!
          </p>
          <p className="mt-[17px] font-Opensans-SemiBold text-[20px]">
            Contact us at know@whyvote.ph to claim this prospect and customize this space! Go mobile
            for a better non-logged in view.
          </p>
        </div>
      </div>

      <div
        className=" p-3 flex flex-col lg:flex-row lg:justify-start justify-center items-center lg:overflow-auto"
        style={{ backgroundColor: "#1BBD904D" }}
      >
        <div className="pt-12 pl-8 flex-shrink-0 mr-3">
          <ProjectCard project={project} numberOfChanges={changes?.changes?.length || 0} />
        </div>
        <div className="lg:hidden">
          <ChangeTimelineMobile changes={changes.changes} projectId={project.id} plan="FREE" />
        </div>
        <div className="hidden lg:block overflow-auto">
          <ChangeTimelineDesktop changes={changes.changes} projectId={project.id} plan="FREE" />
        </div>
      </div>
    </>
  )
}

export default PublicProject

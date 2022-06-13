import React, { useState } from "react"
import { Head, useRouter, useQuery, useParam, useMutation, Routes, Link } from "blitz"
import getProject from "app/prospects/queries/getProject"
import getChanges from "app/records/queries/getChanges"
import deleteChange from "app/records/mutations/deleteChange"
import deleteProject from "app/prospects/mutations/deleteProject"
import voteProject from "app/prospects/mutations/voteProject"
import ProjectCard2 from "app/components/molecules/ProjectCard2"
import { isEmpty } from "lodash"
import ChangeTimelineDesktop from "app/prospects/components/ChangeTimelineDesktop"
import ChangeTimelineMobile from "app/prospects/components/ChangeTimelineMobile"
import ConfirmationModal from "app/components/molecules/ConfirmationModal"
import Image from "next/image"
import { BlueDeleteIcon } from "app/assets"
import toast from "react-hot-toast"
import { User, Plan } from "db"
import ModalDialog from "app/components/molecules/ModalDialog"

interface ProjectPageProps {
  user?: User
}

const Project = ({ user }: ProjectPageProps) => {
  const router = useRouter()
  const slug = useParam("slug", "string") || ""
  const [deleteChangeMutation] = useMutation(deleteChange)
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [voteProjectMutation] = useMutation(voteProject)
  const [project, { refetch: getProjectRefetch }] = useQuery(getProject, { slug })
  const [changes, { refetch }] = useQuery(getChanges, {
    where: { prospectId: project.id },
    orderBy: { updatedAt: "desc" },
  })
  const viewerIsOwner = project.ownerId === user?.id
  const [viewAsOwner, setViewAsOwner] = useState(viewerIsOwner)
  const freeUser = user && (!user?.plan || user?.plan === Plan.FREE)

  const [customizeLayout, setCustomizeLayout] = useState(false)
  const [claimProspect, setClaimProspect] = useState(false)
  const [report, setReport] = useState(false)

  const getPublicChanges = (changesArr) => {
    return changesArr.filter((change) => change.isPublic)
  }

  const getNumberOfChanges = () => {
    return viewerIsOwner ? changes.changes.length : getPublicChanges(changes.changes).length
  }

  const handleDeleteChange = async (changeId) => {
    try {
      await deleteChangeMutation({ id: changeId })
      refetch()
    } catch (error) {
      toast.error(error.toString())
    }
  }

  const handleDeleteProject = async () => {
    try {
      await deleteProjectMutation({ slug: project.slug })
      router.push(Routes.Home())
    } catch (error) {
      toast.error(error.toString())
    }
  }

  const handleVote = async () => {
    try {
      const result = await voteProjectMutation({ id: user?.id, slug: project.slug })

      if (!result) toast.error("You already voted!")
      else {
        getProjectRefetch()
      }

      // router.push(Routes.Home())
    } catch (error) {
      toast.error(error.toString())
    }
  }

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      {!isEmpty(changes.changes) && viewerIsOwner && !freeUser && (
        <>
          {/* <p className="text-gray-400 text-sm text-center mb-2">View as:</p>
          <div className="cursor-pointer flex justify-around bg-white rounded-3xl w-[150px] mb-10 mx-auto">
            <h3
              className={`${
                viewAsOwner ? "bg-primary text-white" : "text-gray-400"
              } rounded-3xl py-2 px-4`}
              onClick={() => setViewAsOwner(true)}
            >
              Owner
            </h3>
            <h3
              className={`${
                !viewAsOwner ? "bg-primary text-white" : "text-gray-400"
              } rounded-3xl py-2 px-4`}
              onClick={() => setViewAsOwner(false)}
            >
              Public
            </h3>
          </div> */}
        </>
      )}
      {/* <div className={!isEmpty(changes.changes) && viewerIsOwner ? `pt-0` : `pt-12`}>
        <ProjectCard2
          handleDeleteProject={handleDeleteProject}
          isOwner={viewerIsOwner}
          project={project}
          numberOfChanges={getNumberOfChanges()}
          handleVote={handleVote}
        />
      </div> */}
      {/*
      {viewerIsOwner && (
        <div className="flex justify-center mt-8">
          <Link
            href={{
              pathname: Routes.NewChangePage().pathname,
              query: { projectId: project.id },
            }}
          >
            <a>
              <h1 className={`bg-primary text-white py-3 px-8 ml-3 mt-2 rounded-sm}`}>
                Create new record
              </h1>
            </a>
          </Link>
        </div>
      )} */}
      <div className="flex">
        {viewerIsOwner && (
          <>
            <div
              className="bg-[#1BBD90] text-white py-3 px-8 ml-3 mt-2 rounded-sm cursor-pointer"
              onClick={() => setCustomizeLayout(true)}
            >
              Customize Layout
            </div>
            <div className="flex  ml-auto">
              <Link
                href={{
                  pathname: Routes.NewChangePage().pathname,
                  query: { projectId: project.id },
                }}
              >
                <a>
                  <h1 className={`bg-[#1BBD90] text-white py-3 px-8 ml-3 mt-2 rounded-sm}`}>
                    Create new record
                  </h1>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="p-3 flex flex-col lg:flex-row  items-start mt-3">
        <div className="pt-10 pl-8 flex-none flex flex-col mr-3">
          {!viewerIsOwner && !project.isClaimed && (
            <div
              className="bg-[#1BBD90] text-white py-3 px-8 my-2 rounded-sm cursor-pointer text-center"
              onClick={() => setClaimProspect(true)}
            >
              Claim this prospect
            </div>
          )}
          <ProjectCard2
            handleDeleteProject={handleDeleteProject}
            isOwner={viewerIsOwner}
            project={project}
            numberOfChanges={getNumberOfChanges()}
            handleVote={handleVote}
          />
          <div className="mt-3 text-center cursor-pointer" onClick={() => setReport(true)}>
            Report a problem?
          </div>
        </div>
        <div className="lg:hidden">
          <ChangeTimelineMobile
            changes={changes.changes}
            projectId={project.id}
            isOwner={viewerIsOwner}
            viewAsOwner={viewAsOwner}
            handleDeleteChange={handleDeleteChange}
            plan={user?.plan ?? "FREE"}
          />
        </div>
        <div className="hidden lg:block overflow-auto">
          <ChangeTimelineDesktop
            changes={changes.changes}
            projectId={project.id}
            isOwner={viewerIsOwner}
            viewAsOwner={viewAsOwner}
            handleDeleteChange={handleDeleteChange}
            plan={user?.plan ?? "FREE"}
          />
        </div>
      </div>

      <ModalDialog open={customizeLayout} onClose={() => setCustomizeLayout(false)}>
        <div className="flex justify-center">
          <div className=" shadow-lg bg-white p-8 w-[500px] ">
            <p className="text-[18px]">
              {`By customizing your layout, you can add images/text that makes your prospect stand out!`}
            </p>
            <p className="text-[18px]">
              Contact us at <u>know@whyvote.com</u> with the subject{" "}
              <b>{`PROSPECT <PROSPECT URL>  CUSTOMIZATION`}</b> and let’s talk about your
              customization.
            </p>
            <div className="flex justify-center">
              <div
                onClick={() => setCustomizeLayout(false)}
                className="bg-[#1BBD90] p-4 w-[130px] mt-3 text-white cursor-pointer text-center"
              >
                OK
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>

      <ModalDialog open={claimProspect} onClose={() => setClaimProspect(false)}>
        <div className="flex justify-center">
          <div className=" shadow-lg bg-white p-8 w-[500px] ">
            <p className="text-[18px]">
              {`This prospect is unclaimed, which means we generated it from our list of PH Candidates for the upcoming election, `}
            </p>
            <p className="text-[18px]">
              Contact us at <u>know@whyvote.com</u> with the subject{" "}
              <b>{`CLAIM ACCOUNT <ACCOUNT NAME>`}</b> for a simple verification process that you are
              a staff/supporter/friend of this candidate or the candidate him/herself.
            </p>
            <br></br>
            <p className="text-[18px]">
              Not that we do not tolerate creation of accounts that intentionally harms/discredits
              other candidates/individuals.
            </p>
            <div className="flex justify-center">
              <div
                onClick={() => setClaimProspect(false)}
                className="bg-[#1BBD90] p-4 w-[130px] mt-3 text-white cursor-pointer text-center"
              >
                OK
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>

      <ModalDialog open={report} onClose={() => setReport(false)}>
        <div className="flex justify-center">
          <div className=" shadow-lg bg-white p-8 w-[500px] ">
            <p className="text-[18px]">
              Send us an email at <u>know@whyvote.ph</u> with the details of the problem you found.
            </p>
            <div className="flex justify-center">
              <div
                onClick={() => setReport(false)}
                className="bg-[#1BBD90] p-4 w-[130px] mt-3 text-white cursor-pointer text-center"
              >
                OK
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    </>
  )
}

export default Project

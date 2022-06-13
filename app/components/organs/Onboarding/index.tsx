import React, { useState } from "react"
import { useMutation, Routes, useRouter, useQuery } from "blitz"
import createProject from "app/prospects/mutations/createProject"
import createChange from "app/records/mutations/createChange"
import ModalDialog from "app/components/molecules/ModalDialog"
import ContentBoxWithCover from "app/components/molecules/ContentBoxWithCover"
import { Onboarding1, Onboarding2, Onboarding3 } from "app/assets"
import Subheading from "app/components/atoms/typography/SubHeading"
import Form, { FormProps } from "./OnboardingForm"
import { z } from "zod"
import { LabeledInput } from "app/components/molecules/LabeledInput"
import ButtonPrimary from "app/components/atoms/Button/Primary"
import ButtonOutlined from "app/components/atoms/Button/Outlined"
import LabeledRadioGroup from "app/components/molecules/LabeledRadioGroup"
import ImageUpload from "app/components/molecules/ImageUpload"
import ProjectCard from "app/components/molecules/ProjectCard"
import { create, isEmpty } from "lodash"
import { imageUpload } from "app/core/utils/image"
import toast from "react-hot-toast"
import { ProjectIcon, TrackRecordIcon, NewsIcon, EducationIcon, PersonalIcon } from "app/assets"
import { ChangeType, Prospect, Plan } from "db"
import LabeledSelect from "app/components/molecules/LabeledSelect"
import LabeledCalendar from "app/components/molecules/LabeledCalendar"
import LabeledTextArea from "app/components/molecules/LabeledTextArea"
import updateUserOnboardingStatus from "app/users/mutations/updateUserOnboardingStatus"
import Image from "next/image"
import { Project as ProjectValidation } from "app/prospects/validations"
import { Change as ChangeValidation } from "app/records/validations"

const StepperNumbers = ({ totalSteps, currentStep }) => {
  const stepperArray = [...Array(totalSteps).fill(0)]
  return (
    <div className="flex justify-between items-center">
      {stepperArray.map((n, i) => {
        return (
          <div key={i} className="relative w-full">
            <div
              className={`h-7 w-7 rounded-full flex justify-center items-center font-bold relative z-10 ${
                i < currentStep ? "bg-primary text-white" : "bg-active text-primary"
              }`}
            >
              <p className="text-xs">{i + 1}</p>
            </div>
            {i <= currentStep - 1 && i !== stepperArray.length - 1 && (
              <div
                className={`absolute top-1/2 left-0 h-1 ${
                  i === currentStep - 1 ? "w-2/3" : "w-full"
                } bg-primary z-0`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface OnboardingProjectFormProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  onSubmit: (values) => any
  initialValues: any
  isSubmitting: boolean
  user: any
  forcedErrors?: any
}

const OnboardingProjectForm = ({
  step,
  setStep,
  onSubmit,
  initialValues,
  isSubmitting,
  user,
  forcedErrors,
}: OnboardingProjectFormProps) => {
  const isPublicOptions = [
    { value: false, text: "Private" },
    { value: true, text: "Public" },
  ]

  const freeUser = !user.plan || user.plan === Plan.FREE

  return (
    <Form
      onSubmit={onSubmit}
      schema={ProjectValidation}
      redirectToStep={(number) => setStep(number)}
      initialValues={{ isPublic: false }}
    >
      {/* Step 1 of onboarding create project */}
      <div className={`${step === 1 ? "block" : "hidden"}`}>
        <div className="mb-12">
          <div className="mb-2">
            <Subheading>Create your first prospect</Subheading>
          </div>
          <p className="text-sm text-gray-500">Start your first prospect in just 3 steps</p>
        </div>
        <div className="mb-8">
          <LabeledInput
            name="name"
            label="Prospect Name"
            placeholder="Minimum 3 letters/numbers"
            labelclassname={"mb-4"}
            copyTarget="slug"
            autoFocus
          />
        </div>
        <div className="mb-12">
          <LabeledInput
            name="slug"
            label="Slug"
            placeholder="My-cool-prospect"
            labelclassname={"mb-4"}
            error={forcedErrors.slug}
          />
        </div>
        <div className="flex justify-center">
          <ButtonPrimary type="button" onClick={() => setStep(step + 1)} className="w-full py-2">
            Next
          </ButtonPrimary>
        </div>
      </div>

      {/* Step 2 of onboarding create project */}
      <div className={`${step === 2 ? "block" : "hidden"}`}>
        <div className="mb-12">
          <div className="mb-2">
            {" "}
            <Subheading>Add some details</Subheading>
          </div>
          <p className="text-sm text-gray-500">Start your first prospect in just 3 steps</p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-8">
          <div className="mb-12">
            <ImageUpload name="image" label="Prospect logo" />
          </div>
          <div className="mb-12">
            <LabeledRadioGroup
              defaultValue={initialValues?.isPublic}
              name={"isPublic"}
              label="Prospect visibility"
              options={isPublicOptions}
              labelclassname={"mb-4"}
              disabled={freeUser}
            />
            <p className="text-sm text-gray-500">
              Publicize prospects by upgrading to Gold membership.
            </p>
          </div>
        </div>
        <div className="mb-12">
          <LabeledInput
            name="url"
            label="Website Url (optional)"
            placeholder="http://"
            labelclassname={"mb-4"}
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-y-5 justify-center lg:space-x-4">
          <ButtonOutlined type="button" onClick={() => setStep(step - 1)} className="w-full py-2">
            Back
          </ButtonOutlined>
          <ButtonPrimary type="button" onClick={() => setStep(step + 1)} className="w-full py-2">
            Next
          </ButtonPrimary>
        </div>
      </div>

      {/* Step 3 of onboarding create project */}
      <div className={`${step === 3 ? "block" : "hidden"}`}>
        <div className="mb-12">
          <div className="mb-2">
            <Subheading>Add your social accounts</Subheading>
          </div>
          <p className="text-sm text-gray-500">Start your first project in just 3 steps</p>
        </div>
        <div className="mb-12">
          <p className="text-sm text-gray-700 mb-2">Social Media Links (Optional)</p>
          <div className="mb-4">
            <LabeledInput
              prefix="twitter.com/"
              name="twitterHandle"
              label=""
              placeholder=""
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <LabeledInput
              prefix="facebook.com/"
              name="facebookHandle"
              label=""
              placeholder=""
              disabled={isSubmitting}
            />
          </div>
          <div className="">
            <LabeledInput
              prefix="instagram.com/"
              name="instagramHandle"
              label=""
              placeholder=""
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-y-5 justify-center lg:space-x-4">
          <ButtonOutlined
            disabled={isSubmitting}
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-full py-2"
          >
            Back
          </ButtonOutlined>
          <ButtonPrimary disabled={isSubmitting} type="submit" className="w-full py-2">
            Finish
          </ButtonPrimary>
        </div>
      </div>
    </Form>
  )
}

interface OnboardingChangeFormProps {
  onSubmit: (values) => any
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  initialValues: any
  isSubmitting: boolean
  user: any
}

const OnboardingChangeForm = ({
  step,
  setStep,
  onSubmit,
  initialValues,
  isSubmitting,
  user,
}: OnboardingChangeFormProps) => {
  const typesOfChange = [
    {
      text: "Project",
      value: ChangeType.PROJECT,
      icon: ProjectIcon,
    },
    {
      text: "Track Record",
      value: ChangeType.TRACKRECORD,
      icon: TrackRecordIcon,
    },
    {
      text: "News",
      value: ChangeType.NEWS,
      icon: NewsIcon,
    },
    {
      text: "Education",
      value: ChangeType.EDUCATION,
      icon: EducationIcon,
    },
    {
      text: "Personal",
      value: ChangeType.PERSONAL,
      icon: PersonalIcon,
    },
  ]

  const freeUser = !user.plan || user.plan === Plan.FREE

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      schema={ChangeValidation}
      redirectToStep={() => {}}
    >
      {/* Step 1 of onboarding create change */}
      <div className={`${step === 1 ? "block" : "hidden"}`}>
        <div className="mb-12">
          <div className="mb-2">
            <Subheading>Create your first record</Subheading>
          </div>
          <p className="text-sm text-gray-500">Start your first record in just 2 steps</p>
        </div>
        <div className="mb-8">
          <LabeledSelect
            name="type"
            label="Choose type of the record"
            options={typesOfChange}
            defaultValue={ChangeType.TRACKRECORD}
            align="center"
            contentWidth="w-96"
          />
        </div>
        <div className="mb-8">
          <LabeledCalendar name="date" label="Choose the date" defaultValue={initialValues.date} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-start-2">
            <ImageUpload name="image" label="Change image" />
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonPrimary type="button" onClick={() => setStep(step + 1)} className="w-full py-2">
            Next
          </ButtonPrimary>
        </div>
      </div>

      {/* Step 2 of onboarding create change */}
      <div className={`${step === 2 ? "block" : "hidden"}`}>
        <div className="mb-12">
          <div className="mb-2">
            <Subheading>Almost done!</Subheading>
          </div>
          <p className="text-sm text-gray-500">Start your first record in just 2 steps</p>
        </div>

        <div className="mb-16">
          <LabeledTextArea
            name="publicDesc"
            label="Write your prospect description:"
            placeholder="We just launched!"
            copyTarget={freeUser ? "" : "privateDesc"}
            copyTargetText={freeUser ? "" : "Copy to Private Description"}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-y-5 justify-center lg:space-x-4">
          <ButtonOutlined
            disabled={isSubmitting}
            type="button"
            onClick={() => setStep(step - 1)}
            className="w-full py-2"
          >
            Back
          </ButtonOutlined>
          <ButtonPrimary disabled={isSubmitting} type="submit" className="w-full py-2">
            Create Record
          </ButtonPrimary>
        </div>
      </div>
    </Form>
  )
}

const ShowCreatedProject = ({ project, setMajorStep }) => {
  return (
    <div className="w-full rounded-lg h-[600px] bg-active flex justify-center items-center flex-col">
      <p className="text-4xl font-bold mb-4">Congratulations!</p>
      <p className="text-gray-700 text-md mb-12">You created your first prospect</p>
      <div className="mb-12">
        <ProjectCard project={project} numberOfChanges={0} />
      </div>
      <p className="text-gray-700 mb-4">Now let&apos;s create your first record</p>
      <ButtonPrimary type="button" className="w-64 py-4" onClick={() => setMajorStep(3)}>
        Create Record
      </ButtonPrimary>
    </div>
  )
}

const Onboarding = ({ user, showOnboarding, setShowOnboarding }) => {
  const maxCreateProjectSteps = 3
  const maxCreateChangeSteps = 2
  const [majorStep, setMajorStep] = useState(1)
  const [createProjectStep, setCreateProjectStep] = useState(1)
  const [createChangeStep, setCreateChangeStep] = useState(1)
  const [project, setProject] = useState<Prospect | null>(null)
  const [forcedErrors, setForcedErrors] = useState({})

  const [createProjectMutation] = useMutation(createProject)
  const [createChangeMutation] = useMutation(createChange)
  const [updateUserOnboardingStatusMutation] = useMutation(updateUserOnboardingStatus)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const handleOnboardingCreateProject = async (values) => {
    if (createProjectStep !== maxCreateProjectSteps) {
      setCreateProjectStep(createProjectStep + 1)
      return
    }

    setIsSubmitting(true)
    setForcedErrors({})

    try {
      if (values.image) {
        values.imageUrl = await imageUpload({
          userId: user?.id,
          dirName: "projectImage",
          file: values.image,
        })
      }

      const project = await createProjectMutation(values)

      setProject(project)
      setMajorStep(2)
    } catch (error) {
      toast.error(String(error))
      if (String(error).toLowerCase().includes("slug")) {
        setForcedErrors({ slug: String(error) })
        setCreateProjectStep(1)
      }
    }

    setIsSubmitting(false)
  }

  const handleOnboardingCreateChange = async (values) => {
    if (createChangeStep !== maxCreateChangeSteps) {
      setCreateChangeStep(createChangeStep + 1)
      return
    }

    values.type = values.type || ChangeType.TRACKRECORD
    values.date = values.date || new Date()
    values.project = {
      id: project?.id,
      slug: project?.slug,
    }

    setIsSubmitting(true)

    try {
      if (values.image) {
        values.imageUrl = await imageUpload({
          userId: user?.id,
          dirName: "changeImage",
          file: values.image,
        })
      }

      await createChangeMutation(values)
      await updateUserOnboardingStatusMutation({ where: { id: user.id } })

      router.push(Routes.ShowProjectPage({ slug: values.project.slug }))
    } catch (error) {
      toast.error(error.toString())
    }

    setIsSubmitting(false)
  }

  const getOnboardingCoverImage = (step) => {
    switch (step) {
      case 1:
        return Onboarding1
      case 2:
        return Onboarding2
      case 3:
        return Onboarding3
      default:
        return Onboarding1
    }
  }

  return (
    <ModalDialog open={showOnboarding} onClose={() => setShowOnboarding(false)}>
      {majorStep === 1 && (
        <ContentBoxWithCover
          coverImage={{ src: getOnboardingCoverImage(createProjectStep), alt: "onboarding" }}
        >
          <div className="flex justify-center mb-6 lg:hidden">
            <Image
              src={getOnboardingCoverImage(createProjectStep)}
              alt="onboarding-image"
              width="180"
              height="180"
            />
          </div>
          <div className="mb-12 w-full lg:w-2/3">
            <StepperNumbers totalSteps={maxCreateProjectSteps} currentStep={createProjectStep} />
          </div>
          <OnboardingProjectForm
            isSubmitting={isSubmitting}
            onSubmit={handleOnboardingCreateProject}
            step={createProjectStep}
            setStep={setCreateProjectStep}
            initialValues={{
              isPublic: false,
            }}
            user={user}
            forcedErrors={forcedErrors}
          />
        </ContentBoxWithCover>
      )}
      {majorStep === 2 && <ShowCreatedProject setMajorStep={setMajorStep} project={project} />}
      {majorStep === 3 && (
        <ContentBoxWithCover
          coverImage={{ src: getOnboardingCoverImage(createChangeStep), alt: "onboarding" }}
        >
          <div className="flex justify-center mb-6 lg:hidden">
            <Image
              src={getOnboardingCoverImage(createChangeStep)}
              alt="onboarding-image"
              width="180"
              height="180"
            />
          </div>
          <OnboardingChangeForm
            user={user}
            isSubmitting={isSubmitting}
            step={createChangeStep}
            setStep={setCreateChangeStep}
            onSubmit={handleOnboardingCreateChange}
            initialValues={{
              userPlan: user.plan || undefined,
              date: new Date(),
              type: ChangeType.TRACKRECORD,
              project: {
                id: project?.id,
                slug: project?.slug,
              },
            }}
          />
        </ContentBoxWithCover>
      )}
    </ModalDialog>
  )
}

export default Onboarding

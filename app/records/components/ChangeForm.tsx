import React from "react"
import Form, { FormProps } from "app/components/molecules/Form"
import LabeledSelect from "app/components/molecules/LabeledSelect"
import { z } from "zod"
import { ProjectIcon, TrackRecordIcon, NewsIcon, EducationIcon, PersonalIcon } from "app/assets"
import LabeledTextArea from "app/components/molecules/LabeledTextArea"
import LabeledCalendar from "app/components/molecules/LabeledCalendar"
import { ChangeType, Plan } from "db"
import ImageUpload from "app/components/molecules/ImageUpload"

export function ChangeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
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

  const { user } = props

  const freeUser = !user.plan || user.plan === Plan.FREE

  return (
    <Form<S> {...props}>
      <div className="flex flex-col">
        <div className="w-full">
          <div className="flex-col">
            <p className="font-Opensans-SemiBold text-[16px]">Upload Image or video clip</p>
            <ImageUpload name="image" defaultValue={props.initialValues?.imageUrl} />
          </div>
        </div>
        <div className="w-full mt-6">
          <LabeledSelect
            name="project"
            label="Choose the prospect you want to add record"
            options={props.projects}
            align="center"
            placeholder="Please choose a prospect"
            contentWidth="w-96"
          />
        </div>
        <div className="w-full mt-6">
          <LabeledSelect
            name="type"
            label="Choose type of the record"
            options={typesOfChange}
            defaultValue={props.initialValues?.type || ChangeType.TRACKRECORD}
            align="center"
            contentWidth="w-96"
          />
        </div>
      </div>
      <div className="w-full mt-6">
        <LabeledCalendar
          name="date"
          label="Choose the date"
          defaultValue={props.initialValues?.date}
        />
      </div>
      <div className="w-full mt-6">
        <LabeledTextArea
          name="publicDesc"
          label="Write your prospect description:"
          // copyTarget={freeUser ? "" : "privateDesc"}
          // copyTargetText={freeUser ? "" : "Copy to Private Description"}
          maxLength={freeUser ? 300 : 9999999}
        />
      </div>
    </Form>
  )
}

import React from "react"
import { z } from "zod"
import { LabeledInput } from "app/components/molecules/LabeledInput"
import LabeledSelect from "app/components/molecules/LabeledSelect"
import Form, { FormProps } from "app/components/molecules/Form"
import LabeledRadioGroup from "app/components/molecules/LabeledRadioGroup"
import ImageUpload from "app/components/molecules/ImageUpload"
import { Plan } from "db"

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & { forcederrors: any; parties: any[] }
) {
  const isPublicOptions = [
    { value: false, text: "Private" },
    { value: true, text: "Public" },
  ]

  const { initialValues, user, forcederrors, parties } = props

  const freeUser = !user.plan || user.plan === Plan.FREE

  const partyOptions = parties.map((party) => {
    return { text: party.partyName, value: party.partyName }
  })

  return (
    <Form<S> {...props}>
      <div className="grid grid-cols-6 lg:gap-x-10 mb-10 xl:gap-x-28 lg:gap-y-8 xl:mb-20 md:gap-x-5 md:gap-y-5 xs:p-2">
        <div className="col-span-12 xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageUpload name="image" defaultValue={initialValues?.imageUrl} />
          <div>
            <LabeledRadioGroup
              defaultValue={initialValues?.isPublic}
              name={"isPublic"}
              label={undefined}
              options={isPublicOptions}
              labelclassname={"mb-4"}
              disabled={freeUser}
            />
            <p className="text-center text-sm text-gray-500">
              You need to be a gold member above to make a prospect public.
            </p>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-3">
          <LabeledInput
            name="name"
            label="Prospect Name"
            placeholder="Minimum 3 letters/numbers"
            labelclassname={"mb-4"}
            copyTarget="slug"
          />
        </div>

        <div className="col-span-12 xl:col-span-3">
          <LabeledInput
            name="url"
            label="Website URL"
            placeholder="http://"
            labelclassname={"mb-4"}
          />
        </div>
        <div className="col-span-12 xl:col-span-3">
          <LabeledInput
            name="slug"
            label="Slug"
            placeholder="My-cool-project"
            labelclassname={"mb-4"}
            error={forcederrors.slug}
          />
        </div>
        <div className="col-span-12 xl:col-span-3">
          {/* <LabeledInput name="party" label="party" placeholder="http://" labelclassname={"mb-4"} /> */}
          <LabeledSelect
            name="partyName"
            label="Choose party"
            options={partyOptions}
            defaultValue={""}
            align="center"
            contentWidth="w-96"
          />
        </div>
      </div>

      <label className="text-sm">Social Media</label>
      {/* <div className="grid grid-cols-6 gap-y-8 gap-x-10 mb-10 xl:gap-x-28 lg:gap-y-8 xl:mb-20 "> */}
      <div className="grid grid-cols-6 gap-y-4 lg:gap-x-10 mb-10 xl:gap-x-28 lg:gap-y-8 xl:mb-20 md:gap-x-5 md:gap-y-5 xs:p-2">
        <div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12">
          <LabeledInput prefix="twitter.com/" name="twitterHandle" label="" placeholder="" />
        </div>
        <div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12">
          <LabeledInput prefix="facebook.com/" name="facebookHandle" label="" placeholder="" />
        </div>
        <div className="col-span-12 lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12">
          <LabeledInput prefix="instagram.com/" name="instagramHandle" label="" placeholder="" />
        </div>
      </div>
    </Form>
  )
}

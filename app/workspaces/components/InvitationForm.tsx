import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form } from "app/core/components/Form"

type InvitationFormProps = {
  onSuccess?: () => void
  initialValues?: {}
  onSubmit: any
}

export const InvitationForm = (props: InvitationFormProps) => {
  return (
    <>
      <Form
        header="Invite A User"
        subHeader="Invite a new member to the workspace. An email will be sent to the user."
        submitText="Invite"
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        testid="inviteForm"
      >
        <LabeledTextField
          name="email"
          type="email"
          label="Email"
          placeholder="partner@company.com"
          testid="inviteEmail"
        />
      </Form>
    </>
  )
}

export default InvitationForm

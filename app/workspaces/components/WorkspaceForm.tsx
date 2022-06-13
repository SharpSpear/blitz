import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form } from "app/core/components/Form"

import { Workspace } from "app/workspaces/validations"

type WorkspaceFormProps = {
  onSuccess?: () => void
  initialValues?: {}
  onSubmit: any
  header: string
  subHeader: string
}

export const WorkspaceForm = (props: WorkspaceFormProps) => {
  return (
    <>
      <Form
        submitText="Submit"
        schema={Workspace}
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        testid="workspaceForm"
        header={props.header}
        subHeader={props.subHeader}
      >
        <LabeledTextField
          name="name"
          label="Name"
          placeholder="Workspace Name"
          testid="workspaceName"
        />
      </Form>
    </>
  )
}

export default WorkspaceForm

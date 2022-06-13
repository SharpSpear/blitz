export class Workspace {
  static selectors = {
    workspaceSettingsLink: '[data-testid="Test Workspace-settingsLink"]',
    workspaceNameInput: '[data-testid="workspaceName-input"]',
    submitButton: '[data-testid="workspaceForm-submitButton"]',
    inviteInput: '[data-testid="inviteEmail-input"]',
    inviteSubmitButton: '[data-testid="inviteForm-submitButton"]',
    specificWorkspaceMember: (email: string) => `[data-testid="workspace-member-${email}"]`,
  }

  static goToWorkspaceSettings = () => {
    cy.get(Workspace.selectors.workspaceSettingsLink).should("be.visible").click()
    cy.location("pathname").should("include", "workspaces/")
  }

  static noSettingsLink = () => {
    cy.get(Workspace.selectors.workspaceSettingsLink).should("not.exist")
  }

  static editWorkspaceName = (workspaceNewName: string) => {
    cy.intercept("POST", "**api/auth/mutations/updateWorkspace").as("update")
    cy.get(Workspace.selectors.workspaceNameInput)
      .scrollIntoView()
      .should("be.visible")
      .click()
      .clear()
      .type(workspaceNewName)
      .invoke("value")
      .should("equal", workspaceNewName)
    cy.get(Workspace.selectors.submitButton).should("be.visible").click()
    return cy.wait("@update").then(({ response }) => expect(response?.statusCode).to.eq(200))
  }

  static forbiddenAccessToSettings = () => {
    cy.contains("h1", "403").should("be.visible")
    cy.contains("h2", `You don't have permission`).should("be.visible")
  }

  static inviteUser = (email: string) => {
    cy.intercept("POST", "**api/workspaces/mutations/inviteToWorkspace").as("invitation")
    cy.get(Workspace.selectors.inviteInput)
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type(email)
      .should("have.value", email)
    cy.get(Workspace.selectors.inviteSubmitButton).should("be.visible").click()
    return cy.wait("@invitation")
  }
}

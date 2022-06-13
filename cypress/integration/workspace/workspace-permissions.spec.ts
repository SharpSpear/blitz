import { LoginPage } from "../../pages/login-page"
import { UserAccountPage } from "../../pages/registered-user-account-page"
import { Workspace } from "../../pages/workspace-page"
import { User } from "../../fixtures/interfaces"

const workspaceOwner: User = { email: "test@test.com", password: "test" }
const workspaceUser: User = { email: "test2@test.com", password: "test" }
const workspaceDetails = {
  name: "Test Workspace",
  slug: "Test - Workspace",
}

describe("Workspace permission", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  afterEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it("Workspace standard user does NOT have editing permission", function () {
    LoginPage.loginViaUI(workspaceUser)
    UserAccountPage.goToWorkspace(workspaceDetails.name)
    // Workspace.goToWorkspaceSettings()
    // Workspace.forbiddenAccessToSettings()
    Workspace.noSettingsLink()
  })

  it("Owner of workspace has editing permission", function () {
    LoginPage.loginViaUI(workspaceOwner)
    UserAccountPage.goToWorkspace(workspaceDetails.name)
    Workspace.goToWorkspaceSettings()
    cy.get(Workspace.selectors.workspaceNameInput).should("be.visible")
  })
})

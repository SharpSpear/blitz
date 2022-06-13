import { LoginPage } from "../../pages/login-page"
import { UserAccountPage } from "../../pages/registered-user-account-page"
import { User } from "../../fixtures/interfaces"

/**
 * @todo migrate seedData from json to TS and calculate these data automatically
 * @todo add data-testid to identify the workspace list from e.g. the new workspace button
 */
const userTocheck: User = { email: "test2@test.com", password: "test" }
const workspaces = ["Test Workspace", "Test Workspace 2", "Test Workspace 5"]

describe("Workspace visibility", () => {
  beforeEach(() => {
    cy.visit("/")
    LoginPage.loginViaUI(userTocheck)
  })

  it("check that a user from the seedData file has all and only the workspaces he is member of", function () {
    workspaces.forEach((workspace) => {
      UserAccountPage.isWorkspacePresent_lp(workspace)
    })

    UserAccountPage.returnNumberOfWorkspacesPresent().should("eq", 3)
  })
})

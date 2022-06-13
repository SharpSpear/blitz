import { LoginPage } from "../../pages/login-page"
import { UserAccountPage } from "../../pages/registered-user-account-page"
import { Workspace } from "../../pages/workspace-page"
import { User } from "../../fixtures/interfaces"

const workspaceOwner: User = { email: "test@test.com", password: "test" }
const invitedUser: User = { email: "test7@test.com", password: "test" }

const workspaceDetails = {
  name: "Test Workspace",
  slug: "Test-Workspace",
}

describe("Workspace invitation", () => {
  beforeEach(() => {
    cy.visit("/")
    LoginPage.loginViaUI(workspaceOwner)
    UserAccountPage.goToWorkspace(workspaceDetails.name)
    Workspace.goToWorkspaceSettings()
    cy.contains("a", "Members").scrollIntoView().should("be.visible").click()
    cy.get('[data-testid="open-inviteUser-modal"]').click()
  })

  it("Workspace owner invites user", function () {
    Workspace.inviteUser(invitedUser.email).then(
      ({
        response: {
          body: { result },
        },
      }) => {
        // logout
        cy.clearLocalStorage()
        cy.clearCookies()
        // guest user accepting invitatation clicking on link
        cy.visit(result)
        LoginPage.loginViaUI(invitedUser)
        cy.location("pathname").should("contain", `workspaces/${workspaceDetails.slug}`)
        UserAccountPage.isWorkspacePresent(workspaceDetails.slug)
        UserAccountPage.logout()
        LoginPage.loginViaUI(workspaceOwner)
        UserAccountPage.goToWorkspace(workspaceDetails.name)
        Workspace.goToWorkspaceSettings()
        cy.contains("a", "Members").scrollIntoView().should("be.visible").click()
        cy.get(Workspace.selectors.specificWorkspaceMember(invitedUser.email)).should("be.visible")
      }
    )
  })
})

export class UserAccountPage {
  static selectors = {
    logoutButton: '[data-testid="Sign Out-navLink"]',
    mobileMenu: '[data-testid="openMobileMenu"]',
    createNewWorkSpaceLink: '[data-testid="newWorkspaceLink"]',
    genericWorkspaceInLandingPage: 'a[href^="/workspaces/"]',
  }

  static goToWorkspace = (workspacename: string) => {
    if (workspacename) {
      cy.wait(3000)
      cy.contains("a", workspacename).scrollIntoView().should("be.visible").click()
    }
  }

  static logout = () => {
    cy.intercept("POST", "**/api/auth/mutations/logout").as("logout")
    cy.get(UserAccountPage.selectors.mobileMenu).should("be.visible").click()
    cy.get(UserAccountPage.selectors.logoutButton).should("be.visible").click()
    return cy.wait("@logout").then(({ response }) => expect(response?.statusCode).to.eq(200))
  }

  static isWorkspacePresent = (slug: string) => cy.contains("span", slug).should("be.visible")

  static isWorkspacePresent_lp = (name: string) =>
    cy.contains(UserAccountPage.selectors.genericWorkspaceInLandingPage, name).should("be.visible")

  static returnNumberOfWorkspacesPresent = () =>
    cy.get('[data-testid="workspacelink"]').its("length")
}

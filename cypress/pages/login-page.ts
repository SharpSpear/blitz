import { User } from "../fixtures/interfaces"

export class LoginPage {
  static selectors = {
    loginForm: '[data-testid="loginForm-form"]',
    signupLink: '[data-testid="signupLink"]',
    loginEmailInput: '[data-testid="loginEmail-input"]',
    loginPasswordInput: '[data-testid="loginPassword-input"]',
    submitButton: '[data-testid="loginForm-submitButton"]',
  }

  static goToSignupPage = () => {
    cy.get(LoginPage.selectors.signupLink)
      .scrollIntoView()
      .should("be.visible")
      .click()
      .url()
      .should("include", "signup")
  }

  static loginViaUI = ({ email, password }: User) => {
    cy.intercept("POST", "**api/auth/mutations/login").as("login")
    cy.get(LoginPage.selectors.loginForm).scrollIntoView().should("be.visible")
    cy.get(LoginPage.selectors.loginEmailInput).clear().type(email).should("have.value", email)
    cy.get(LoginPage.selectors.loginPasswordInput).clear().type(password)
    cy.get(LoginPage.selectors.submitButton).should("be.visible").click()
    cy.wait("@login").then(({ response }) => expect(response?.statusCode).to.eq(200))
  }
}

import { User } from "../fixtures/interfaces"

export class SignupPage {
  static selectors = {
    signupForm: '[data-testid="signupForm-form"]',
    signupEmailInput: '[data-testid="signupEmail-input"]',
    signupPasswordInput: '[data-testid="signupPassword-input"]',
    submitButton: '[data-testid="signupForm-submitButton"]',
  }

  static signupWithUser = ({ email, password }: User) => {
    cy.intercept("POST", "**api/auth/mutations/signup").as("signup")
    cy.get(SignupPage.selectors.signupForm).scrollIntoView().should("be.visible")
    cy.get(SignupPage.selectors.signupEmailInput).clear().type(email).should("have.value", email)
    cy.get(SignupPage.selectors.signupPasswordInput).clear().type(password)
    cy.get(SignupPage.selectors.submitButton).should("be.visible").click()
    cy.wait("@signup").then(({ response }) => expect(response?.statusCode).to.eq(200))
  }
}

import { UserUtilities } from "../../helpers/user-helper"
import { LoginPage } from "../../pages/login-page"
import { SignupPage } from "../../pages/signup-page"

describe("New User Registration", () => {
  beforeEach(() => {
    cy.wrap(UserUtilities.returnNewUser({})).as("newUser")
    cy.visit("/")
  })

  it("Sign-up with a new user (positive case)", function () {
    LoginPage.goToSignupPage()
    SignupPage.signupWithUser(this.newUser)
  })
})

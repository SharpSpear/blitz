import { User } from "../fixtures/interfaces"

export class UserUtilities {
  static returnNewUser = ({
    name,
    email,
    password,
  }: {
    name?: string
    email?: string
    password?: string
  }): User => {
    const dynamicPart = Date.now()
    return {
      name: name ?? `test-fullname-${dynamicPart}`,
      email: email ?? `test-user-${dynamicPart}@gmail.com`,
      password: password ?? dynamicPart,
    } as User
  }
}

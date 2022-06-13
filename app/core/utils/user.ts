export const getFullName = (user) => {
  let fullName = ""

  if (!user) {
    return fullName
  }

  fullName += user.firstName ? `${user.firstName} ` : ""

  fullName += user.lastName ? user.lastName : ""

  return fullName
}

export const fullNameSelect = () => {
  return { firstName: true, lastName: true }
}

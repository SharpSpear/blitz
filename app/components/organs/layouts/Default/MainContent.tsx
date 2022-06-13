import React from "react"

function MainContent({ children }) {
  return (
    // <main className="container mx-lg h-full flex items-center justify-center">
    <main className="h-full flex items-center justify-center">
      <div className="flex-1 min-h-[50vh] relative  focus:outline-none">{children}</div>
    </main>
  )
}

export default MainContent

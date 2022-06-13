import React from "react"

function MainContent({ children }) {
  return (
    <main className="container mx-lg h-full flex items-center justify-center">
      <div className="flex-1 relative overflow-y-auto focus:outline-none">{children}</div>
    </main>
  )
}

export default MainContent

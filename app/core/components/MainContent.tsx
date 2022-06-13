import React from "react"

function MainContent({ children }) {
  return (
    <main className="flex-1 relative  focus:outline-none pt-14 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </main>
  )
}

export default MainContent

import React, { useState } from "react"

const ReadMore = ({ children }) => {
  const text = children
  const [toShow, setToShow] = useState(false)
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  React.useEffect(() => {
    if (children.length > 150) setToShow(true)
  }, [children])

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      {toShow && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </p>
  )
}

export default ReadMore

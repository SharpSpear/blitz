import { ReactNode } from "react"

interface IProps {
  cards: ReactNode[]
  padding?: boolean
}

const MasonryGrid = ({ cards = [], padding = true }: IProps) => {
  return (
    <div className={"min-h-screen " + (padding ? "px-0 pt-10  sm:p-10" : "")}>
      <div className="masonry ">
        {cards.map((card, i) => {
          return (
            <div key={i} className="break-inside">
              {card}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MasonryGrid

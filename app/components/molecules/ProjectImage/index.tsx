import { Image } from "blitz"
import { Prospect } from "db"

interface Iprops {
  project: Prospect
  className?: string
  width?: string | number
  fallBackClass?: string
  fallBackWidth?: string | number
  fallBackHeight?: string | number
  height?: string | number
  alt?: string
  textSize?: string
  extra?: string
}

const ProjectImage = ({
  project,
  className = "",
  width = "100%",
  height = "100%",
  fallBackClass = "",
  fallBackWidth = "100%",
  fallBackHeight = "200px",
  extra = "",
  textSize = "text-5xl",
}: Iprops) => {
  return project.imageUrl ? (
    <Image
      src={project.imageUrl}
      alt={project.name}
      objectFit="cover"
      width={width}
      height={height}
      layout="responsive"
      objectPosition="center center"
      priority
      className={className}
    />
  ) : (
    <div
      className={
        "w-full h-full bg-gray-300 flex justify-center items-center " + extra + " " + fallBackClass
      }
    >
      <p className={"text-gray-400 " + textSize}>{project.name.charAt(0)}</p>
    </div>
  )
}

export default ProjectImage

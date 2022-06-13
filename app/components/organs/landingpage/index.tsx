import SubHeading from "app/components/atoms/typography/SubHeading"
import ChangeLogCard from "app/components/molecules/ChangeLogCard"
import MasonryGrid from "app/components/molecules/MasonryGrid"

const LandingPage = () => {
  const changelogCards = [
    <ChangeLogCard key={1} type="project" />,
    <ChangeLogCard key={2} type="trackrecord" />,
    <ChangeLogCard key={3} type="trackrecord" />,
    <ChangeLogCard key={4} type="news" />,
    <ChangeLogCard key={5} type="trackrecord" />,
    <ChangeLogCard key={6} type="project" />,
  ]
  return (
    <>
      <div className={""}>
        <SubHeading className="text-center">Discover New Prospects</SubHeading>
        <MasonryGrid cards={changelogCards} />
      </div>
    </>
  )
}

export default LandingPage

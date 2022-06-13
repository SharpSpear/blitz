const SubHeading = ({ children, ...props }) => {
  return <h2 className={`text-2xl leading-9 font-bold ${props.className}`}>{children}</h2>
}

export default SubHeading

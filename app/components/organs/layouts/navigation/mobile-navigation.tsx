import { useUI } from "app/contexts/ui.context"
import React from "react"
import Drawer from "./drawer"
import DrawerWrapper from "./drawer-wrapper"

const MobileNavigation: React.FC = ({ children }) => {
  const { displaySidebar, closeSidebar } = useUI()

  return (
    <Drawer open={displaySidebar} onClose={closeSidebar} variant="left">
      <DrawerWrapper onClose={closeSidebar}>
        <div className="flex flex-col space-y-6 p-5  bg-[#1BBD90]">{children}</div>
      </DrawerWrapper>
    </Drawer>
  )
}
export default MobileNavigation

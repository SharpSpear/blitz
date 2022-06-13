import React, { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  header?: string
  hideCloseButton?: boolean
}

export const ModalDialog = ({ open, onClose, children, header, hideCloseButton }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open, isOpen])

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Overlay>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40 overflow-y-auto" />
        </Dialog.Overlay>
        <Dialog.Content
          onEscapeKeyDown={onClose}
          onInteractOutside={onClose}
          className="rounded-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full lg:w-11/12 lg:max-w-mx-auto overflow-auto max-h-screen"
        >
          {!hideCloseButton && (
            <button className="absolute top-2.5	right-2.5" onClick={onClose}>
              <Cross2Icon />
            </button>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export default ModalDialog

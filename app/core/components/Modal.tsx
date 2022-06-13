import React from "react"
import * as Dialog from "@radix-ui/react-dialog"

type ModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  children: React.ReactNode
  header: string
}

export const Modal = ({ open, setOpen, children, header }: ModalProps) => {
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        {open && <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />}
        <Dialog.Content className="rounded-sm fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-11/12 md:w-auto overflow-auto">
          {children}
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}

export default Modal

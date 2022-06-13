import React, { FC, useEffect, useState } from "react"
import ModalDialog from "../ModalDialog"

interface Props {
  open: boolean
  confirmText: string
  cancelText: string
  onConfirm?: () => {} | void
  onCancel?: () => void
}

/**
 * @author
 * @function ConfirmationModal
 **/

const ConfirmationModal: FC<Props> = ({ open, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <ModalDialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
    >
      <div className="flex font-Montserrat justify-center">
        <div
          className="bg-white flex flex-col justify-between shadow-lg text-center p-8"
          style={{
            height: "346px",
            width: "451px",
          }}
        >
          {props.children}
          <div className="flex justify-between">
            <div className="bg-button cursor-pointer px-8 p-2 text-white" onClick={props.onConfirm}>
              {props.confirmText}
            </div>
            <div
              className="border-button text-button border cursor-pointer px-8 p-2"
              onClick={() => {
                setIsOpen(false)
                props.onCancel?.()
              }}
            >
              {props.cancelText}
            </div>
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}

ConfirmationModal.defaultProps = {
  confirmText: "Yes",
  cancelText: "No",
}
export default ConfirmationModal

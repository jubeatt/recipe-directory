import React from 'react'
import { AiOutlineClose } from "react-icons/ai"

export default function Modal({ onClose, children }) {

  return (
    <div className='fixed inset-0 bg-rgba-black flex overflow-y-auto py-8'>
      <div className='bg-white w-full relative my-auto mx-10 max-w-600 md:w-3/4 md:m-auto px-10 py-6 rounded'>
        <button
          onClick={onClose}
          className='absolute top-2.5 right-2.5 cursor-pointer'
        >
          <AiOutlineClose size={22} />
        </button>
        {children}
      </div>
    </div>
  )
}

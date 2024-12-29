import Link from 'next/link'
import React from 'react'
import CartPanel from './CartPanel'

function Navbar() {
  return (
    <div className=' max-w-6xl m-auto w-[90%]'>
      <nav className=' bg-white shadow-lg p-3 md:p-4 mt-4 flex justify-between items-center rounded-lg'>
        <Link href='/' className=' bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent font-semibold text-2xl' >
          Store
        </Link>
        <div className=' flex items-center space-x-4'>
          <CartPanel />
        </div>
      </nav>
    </div>
  )
}

export default Navbar

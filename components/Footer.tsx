import React from 'react'

function Footer() {
  return (
    <footer>
      <div className="bg-background border-t border-gray-600 p-4 mx-3 text-white rounded-b">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-3 sm:mb-0 text-center">Built with Next.js, Tailwind CSS, & FakeStore API</p>
          <p className="text-sm text-muted-foreground ">&#169; ShopEasy 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
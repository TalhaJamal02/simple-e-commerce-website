import Link from 'next/link'
import Image from "next/image";
import React from 'react'

function Hero() {
  return (
    <div className="bg-gray-800 mt-6 md:mt-10 flex flex-col md:flex-row items-center md:items-stretch justify-between text-white relative rounded-xl py-3 sm:py-0 px-7 md:px-10 space-y-6 md:space-y-0">
      <div className="z-10 max-w-lg text-center md:text-left flex flex-col justify-center">
        <span className="text-lg font-semibold uppercase">Sale</span>
        <h1 className="text-4xl md:text-6xl font-bold uppercase my-4 leading-tight">
          Up To <br /> 50% Off
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Don&apos;t miss out on our biggest sale of the year!
        </p>
        <Link
          href="/"
          className="px-6 bg-black py-3 text-sm uppercase hover:bg-gray-700 text-white rounded-md mx-auto md:mx-0 w-fit"
        >
          Shop Now
        </Link>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 h-64 md:h-auto items-center justify-center">
        <Image
          src="/Images/hero.png"
          alt="Sale Hero"
          objectFit="cover"
          className="rounded-xl"
          width={400}
          height={500}
        />
      </div>
    </div>
  )
}

export default Hero

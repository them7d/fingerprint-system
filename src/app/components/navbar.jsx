import React from 'react'
import Link from 'next/link'
function navbar() {
  return (
    <>
        <div className='h-16 flex justify-center items-center content-center py-10 box-border'>
            <div className='text-white font-bold text-2xl cursor-pointer'>
                <Link href='/'>
                    Home
                </Link>
            </div>
            <div className='text-white font-bold text-2xl cursor-pointer ml-10'>
                <Link href='/about'>
                    About
                </Link>
            </div>
        </div>
    </>
  )
}

export default navbar

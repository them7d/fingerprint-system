import React from 'react'
import Link from 'next/link'
function navbar() {
  return (
    <>
        <div className='h-16 flex w-full py-10 box-border'>
            <div className="flex items-center justify-center content-center grow font-bold text-2xl">
                <div className='cursor-pointer'>
                    <Link href='/'>
                        Home
                    </Link>
                </div>
                <div className='cursor-pointer ml-10'>
                    <Link href='/about'>
                        About
                    </Link>
                </div>
            </div>
            <div className='text-lg flex items-center cursor-pointer mr-10'>
                <div className='py-1 px-3 rounded'>

                    <Link href='/login'>
                        login
                    </Link>
                </div>
                    
                <div className='py-1 px-3 rounded  bg-[var(--accent)] hover:bg-[var(--accent-hover)]'>
                    <Link href='/signup'>
                        sign
                    </Link>
                </div>
        </div>
        </div>
    </>
  )
}

export default navbar

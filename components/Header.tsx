'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle'

const Header = () => {
  const session = useSession()

  return (
    <header className='flex items-center justify-between h-[100px]'>
      <Link href='/' className='font-bold text-[22px] flex' title='Home'>
        <Image src='/logo.png' alt='' title='My App' width='35' height='30' className='rounded-[50%] mr-[10px]' />
        MyApp
      </Link>
      <div className='links'>
        <DarkModeToggle />
        <Link title='About' href='/about'>About</Link>
        <Link title='Portfolio' href='/portfolio'>Portfolio</Link>
        <Link title='Posts' href='/blog'>Posts</Link>

        {session.status == 'authenticated'
          ? <div className='flex items-center justify-between'>
            <Link className='font-bold mr-4 ml-4' title='Click to visit your account' href='/dashboard'>
              {session?.data?.user?.name}</Link>
            <button
              className='p-[5px] bg-[#62a21f] text-white cursor-pointer rounded-[3px] hover:bg-[#548b1a]'
              onClick={() => signOut() as unknown as React.MouseEventHandler<HTMLButtonElement>}>
              <Image src='/log.png' alt="logout" title='logout' width='35' height='35' className='headerImage' />
            </button>
          </div>
          : <Link
            href='/dashboard/register'
            className='p-[5px] bg-[#62a21f] text-white cursor-pointer rounded-[3px] hover:bg-[#548b1a]'>
            <Image src='/log.png' alt="login" title='login' width='35' height='35' className='headerImage transform scale-x-[-1]' />
          </Link>
        }

      </div>

    </header>
  )
}


export default Header
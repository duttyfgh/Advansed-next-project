'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle'
import cls from './Header.module.css'

const Header = () => {
  const session = useSession()
  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  const closeDropdown = () => {
    setIsDropdown(false)
  }

  const openDropdown = () => {
    setIsDropdown(true)
  }

  return (
    <header className={cls.header}>
      <Link href='/' className={cls.logo} title='Home'>
        <Image src='/logo.png' alt='' title='My App' width='35' height='30' className='rounded-[50%] mr-[10px]' />
        <span>MyApp</span>
      </Link>
      <div className={cls.links}>
        <DarkModeToggle />

        <div className={cls.headerLinks}>
          <Link title='About' href='/about'>About</Link>
          <Link title='Portfolio' href='/portfolio'>Portfolio</Link>
          <Link title='Posts' href='/blog'>Posts</Link>
        </div>

        {session.status == 'authenticated'
          ? <div className='flex items-center justify-between'>
            <Link
              className='p-[5px] bg-[#62a21f] text-white cursor-pointer rounded-[8px] px-[10px] py-[7px] hover:bg-[#548b1a]'
              title='Click to visit your account'
              href='/dashboard'>
              <Image src='/user.png' width={24} height={24} alt={session?.data?.user?.name || 'Profile'} className='reverseVector' />
            </Link>
          </div>
          : <>
            <Link
              href='/dashboard/register'
              className='p-[5px] bg-[#62a21f] text-white cursor-pointer rounded-[8px] hover:bg-[#548b1a]'>
              <Image src='/log.png' alt="login" title='login' width='35' height='35' className='headerImage transform scale-x-[-1]' />
            </Link>
          </>
        }
        <div
          className={cls.bars}>
          {
            isDropdown
              ? <Image
                src='/xMark.png'
                alt="bars"
                title='login'
                width='22'
                height='22'
                className='headerImage transform scale-x-[-1]'
                onClick={closeDropdown}
              />

              : <Image
                src='/bars.png'
                alt="bars"
                title='login'
                width='25'
                height='25'
                className='headerImage transform scale-x-[-1]'
                onClick={openDropdown}
              />
          }

          {
            isDropdown && <div className={cls.dropdown}>
              <div className='relative'>
                <div className={cls.dropdownLinks}>
                  <Link title='About' href='/about' className={cls.linkItem} onClick={closeDropdown}>
                    <Image width={24} height={24} src={'/about.png'} alt='...' />
                    <span>About</span>
                  </Link>
                  <div className={cls.line}></div>
                  <Link title='Portfolio' href='/portfolio' className={cls.linkItem} onClick={closeDropdown}>
                    <Image width={24} height={24} src={'/portfolio.png'} alt='...' />
                    <span>Portfolio</span>
                  </Link>
                  <div className={cls.line}></div>
                  <Link title='Posts' href='/blog' className={cls.linkItem} onClick={closeDropdown}>
                    <Image width={24} height={24} src={'/posts.png'} alt='...' />
                    <span>Posts</span>
                  </Link>
                </div>
              </div>
            </div>
          }
        </div>

      </div>

    </header>
  )
}


export default Header
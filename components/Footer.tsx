import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[50px] text-[14px] flex items-center justify-evenly mb-[10px]'>
      <div>2023 &copy; MyApp. All rights reserved</div>
      <div className='flex items-center gap-[10px]'>
        <a href="https://github.com/duttyfgh" target='_blank'>
          <Image src='/git.png' width={20} height={20} alt='github' title='github' className='opacity-[0.6] cursor-pointer icon' />
        </a>
        <a href="https://www.instagram.com/dutyfgh" target='_blank'>
          <Image src='/inst.png' width={20} height={20} alt='instagram' title='instagram' className='opacity-[0.6] cursor-pointer icon' />
        </a>
        <a href="https://twitter.com/" target='_blank'>
          <Image src='/twitter.png' width={20} height={20} alt='twitter' title='twitter' className='opacity-[0.6] cursor-pointer icon' />
        </a>
        <a href="https://youtube.com/" target='_blank'>
          <Image src='/yt.png' width={20} height={20} alt='youtube' title='youtube' className='opacity-[0.6] cursor-pointer icon' />
        </a>
      </div>
    </footer>
  )
}

export default Footer
import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center pr-[500px]'>
        <Image
          src={'/loading.gif'}
          width={500}
          height={500}
          alt='Loading...'
        />
    </div>
  )
}

export default Loading
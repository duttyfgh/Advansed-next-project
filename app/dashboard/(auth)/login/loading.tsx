import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen flex content-center'>
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
import { post } from '@/modules/modules'
import Image from 'next/image'
import React from 'react'
import styles from './id.module.css'

interface IBlogIDProps {
  params: {
    id: string
  }
}

const getData = async (id: string) => {
  const response = await fetch(`https://nextapp-one-puce.vercel.app/api/posts/${id}`, { cache: 'no-store' })

  const data: post = await response.json()
  return data
}

export async function generateMetadata({ params }: IBlogIDProps) {
  const post = await getData(params.id)
  return {
    title: `Blog | ${post.title}`,
    description: post.desc,
  };
}

const BlogID = async ({ params }: IBlogIDProps) => {
  const data = await getData(params.id)

  const [date, time] = data.createdAt.split("T")

  const formattedDate = date.replace(/-/g, '.')
  return (
    <div className='flex items-center flex-col'>
      <span className='w-[100%] text-[30px] text-center'>{data.title}</span>
      <p>{data.desc}</p>
      <div className='flex items-center w-[1000px] justify-between mt-[120px]'>
        <Image className='rounded-[8px]' src={data.img} alt='...' width={440} height={440} />
        <div>
          <p className='text-[20px] max-w-[460px] p-[20px]'>{data.content}</p>
          <div className={styles.user} title={`" ${data.username} " create the post`}>
            <div className='flex items-center' >
              <Image src={data.img} alt='...' width={60} height={60} className='resize-none text-[20px] rounded-[50%]' />
              <span className='font-bold text-[20px] ml-[10px]'>{data.username}</span>
            </div>
            <div className='flex items-center justify-center flex-col'>
              <p className='font-bold text-[18px] mr-4'>Time of creation</p>
              <span className='text-[16px]'>{time.slice(0, 5)} {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BlogID
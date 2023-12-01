import { post } from '@/modules/modules'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import cls from './id.module.css'

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
    <main className={cls.main}>
      <div className='w-[100%]'>
        <Link href='/blog'>
          <Image src='/arrow.png' width={40} height={30} alt='<--' title='<- Come back' className={`${cls.arrow} defaultVector`} />
        </Link>
        <span className={cls.title}>{data.title}</span>
        <p className={cls.description}>{data.desc}</p>

        <p className={cls.content}>{data.content}</p>
        <div className={cls.mobileDataTime}>
          <span className='font-bold '>{data.username}</span>
          <div className='gap-[10px] flex'>
            <span>Posted at:</span>
            <span className='font-bold'>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className={cls.secondBlock}>
        <div>
          <Image src={data.img} width={350} height={350} alt={data.title} className='rounded-[4px]' />
        </div>
        <div className={cls.dataTime}>
          <span className='font-bold '>{data.username}</span>
          <div className='gap-[10px] flex'>
            <span>Posted at:</span>
            <span className='font-bold'>{formattedDate}</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogID
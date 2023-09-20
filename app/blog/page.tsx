import { post } from '@/modules/modules'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLatter'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { generateMetadata } from '../layout'
import styles from './posts.module.css'

const getData = async () => {
  const response = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' })// {next: { revalidate: 60 }} 

  const data: post[] = await response.json()
  return data
}

export const metadata = generateMetadata('Posts')

const Blog = async () => {
  const data = await getData()

  return (
    <div>
      {data.map(item =>
        <Link key={item._id} href={`blog/${item._id}`} className={styles.container}>
          <div className={styles.imageContainer}>
            <Image src={item.img}
              alt={item.title}
              width={250}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{capitalizeFirstLetter(item.title)}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>)}

    </div>
  )
}

export default Blog
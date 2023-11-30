import { post } from '@/modules/modules';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLatter';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateMetadata } from '../layout';
import styles from './posts.module.css';

const isVercel = process.env.VERCEL === '1';

const getData = async () => {
  let apiUrl;

  if (isVercel) {
    apiUrl = 'https://nextapp-one-puce.vercel.app/api/posts';
  } else {
    apiUrl = 'http://localhost:3000/api/posts';
  }

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data: post[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const metadata = generateMetadata('Posts');

const Blog = async () => {
  try{const data = await getData()

  return (
    <div className='flex items-center flex-col'>
      {data.map((item) => (
        <Link key={item._id} href={`blog/${item._id}`} className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
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
        </Link>
      ))}
    </div>
  );}
  catch {
    return <div>Error</div>
  }
};

export default Blog;

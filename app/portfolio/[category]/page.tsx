import Button from '@/components/Button'
import Image from 'next/image'
import React from 'react'
import styles from './category.module.css'
import { notFound } from 'next/navigation';
import { items } from './data';
import { ProfileData } from '@/modules/modules';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLatter';


interface ISlugProps {
  params: {
    category: AllowedValues
  }
}

type AllowedValues = 'applications' | 'illustrations' | 'websites'

const getData = (cat: AllowedValues) => {
  const data = items[cat]

  if (data) {
    return data
  } else {
    return notFound()
  }
}

export async function generateMetadata({ params }: ISlugProps) {
  return {
    title: `Portfolio | ${capitalizeFirstLetter(params.category)}`,
    description: 'Description',
  }
}

const Slug = ({ params }: ISlugProps) => {
  const data: ProfileData[] = getData(params.category)
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{capitalizeFirstLetter(params.category)}</h1>

      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button
              text="See More"
              url="https://ru.wix.com/portfolio-website?utm_source=google&gclid=
            CjwKCAjwsKqoBhBPEiwALrrqiIzDv3ilR7MvScSfRflWei2-3SU35O4iNnGKQgomva1lGI9YfrnYNRoCuSoQAvD_BwE&utm_
            campaign=17462238397%5E140629012714&experiment_id=%5E%5E603331284932%5E%5E_DSA&utm_medium=cpc" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt={item.title}
            />
          </div>
        </div>

      ))}
    </div>
  )
}

export default Slug
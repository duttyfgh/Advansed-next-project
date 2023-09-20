import Image from 'next/image'
import React from 'react'
import { generateMetadata } from '../layout'
import styles from './about.module.css'

export const metadata = generateMetadata('About')

const About = () => {
  return (
    <div>
      <div className={styles.imgContainer}>
        <Image
          src="/test.png"
          fill={true}
          alt="about us"
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className='font-bold text-[20px]'>Dutyfgh corporation</h1>
          <h2 className={styles.imgDesc}>
            It's a really serious corporation
          </h2>
        </div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who Are We?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quae dolor, optio voluptatibus magnam iure esse tempora beatae. A
            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ducimus quae dolor, optio voluptatibus magnam iure esse tempora
            beatae, a suscipit eos. Animi quibusdam cum omnis officiis
            <br />
            <br />
            voluptatum quo ea eveniet? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ducimus quae dolor, optio voluptatibus magnam iure
            esse tempora beatae, a suscipit eos. Animi quibusdam cum omnis
            officiis voluptatum quo ea eveniet?
          </p>
        </div>

        <div className={styles.item}>
          <h1 className={styles.title}>What We Do?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quae dolor, optio voluptatibus magnam iure esse tempora beatae, a
            suscipit eos. Animi quibusdam cum omnis officiis voluptatum quo ea
            eveniet? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            <p>- Creative Illustrations</p>
            <p>- Dynamic Websites</p>
            <p>- Fast and Handy</p>
            <p>- Mobile Apps</p>
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
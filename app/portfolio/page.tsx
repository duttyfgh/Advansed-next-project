import Link from 'next/link'
import { generateMetadata } from '../layout'
import styles from './portfolio.module.css'

export const metadata = generateMetadata('Portfolio')

const Portfolio = () => {
  return (
    <div className='pl-[120px]'>
    <h1 className={styles.selectTitle}>Choose a gallery</h1>
    <div className={styles.items}>
      <Link href="/portfolio/illustrations" className={styles.item}>
        <span className={styles.title}>Illustrations</span>
      </Link>
      <Link href="/portfolio/websites" className={styles.item}>
        <span className={styles.title}>Websites</span>
      </Link>
      <Link href="/portfolio/applications" className={styles.item}>
        <span className={styles.title}>Application</span>
      </Link>
    </div>
  </div>
  )
}

export default Portfolio
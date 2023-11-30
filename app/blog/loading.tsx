import Image from 'next/image'
import styles from './posts.module.css';

const Loading = () => {
  return (<>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={'/loading.gif'}
          width={250}
          height={250}
          alt='Loading...'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Loading title...</h1>
        <p className={styles.desc}>Loading title...</p>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={'/loading.gif'}
          width={250}
          height={250}
          alt='Loading...'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Loading title...</h1>
        <p className={styles.desc}>Loading title...</p>
      </div>
    </div>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={'/loading.gif'}
          width={250}
          height={250}
          alt='Loading...'
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Loading title...</h1>
        <p className={styles.desc}>Loading title...</p>
      </div>
    </div>
  </>
  )
}

export default Loading
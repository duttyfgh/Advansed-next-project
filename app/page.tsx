import Image from "next/image"
import Hero from '@/public/hero.png'
import { generateMetadata } from "./layout"
import cls from './Page.module.css'
import Link from "next/link"

export const metadata = generateMetadata('Home')

const Home = () => {
  return (
    <main className={cls.main}>
      <div className={cls.item}>
        <div className={cls.mainTextShell}>
          <h1 className={cls.title}>
            The Future of AI in the next few years
          </h1>
        </div>
        <p className={cls.secondText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, mollitia. Lorem, ipsum dolor.
        </p>
        <Link href="/portfolio" title='Portfolio' className={cls.button}>See Our Works</Link>
      </div>
      <div className='flex justify-start items-start w-[100%] flex-1'>
        <Image src={Hero} alt='Ai' className={cls.img}/>
      </div>
    </main>
  )
}

export default Home
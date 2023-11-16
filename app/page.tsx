import Button from "@/components/Button"
import Image from "next/image"
import Hero from '@/public/hero.png'
import { generateMetadata } from "./layout"

export const metadata = generateMetadata('Home')

const Home = () => {
  return (
    <main className="flex items-center gap-[100px]">
      <div className="item">
        <div className='w-[496px]'>
          <h1 className="title">
            The Future of AI in the next few years
          </h1>
        </div>
        <p className='text-[24px] text-weight-[300] mb-[30px]'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, mollitia. Lorem, ipsum dolor.
        </p>
        <Button title='Portfolio' text="See Our Works" url="/portfolio" />
      </div>
      <div className="item">
        <Image src={Hero} alt='Ai' className='object-contain img'/>
      </div>
    </main>
  )
}

export default Home
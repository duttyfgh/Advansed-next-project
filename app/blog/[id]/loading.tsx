import Image from 'next/image'
import cls from './id.module.css'

const Loading = () => {
  return (
    <main className={cls.main}>
    <div className='w-[100%]'>
      <span className={cls.title}>Loading title...</span>
      <p className={cls.description}>Loading description...</p>

      <p className={cls.content}>Loading text...</p>
      <div className={cls.mobileDataTime}>
        <span className='font-bold '>Loading username...</span>
        <div className='gap-[10px] flex'>
          <span>Posted at:</span>
          <span className='font-bold'>Loading date...</span>
        </div>
      </div>
    </div>

    <div className={cls.secondBlock}>
      <div>
        <Image src='/loading.gif' width={350} height={350} alt='Loading...' className='rounded-[4px]' />
      </div>
      <div className={cls.dataTime}>
        <span className='font-bold '>Loading username...</span>
        <div className='gap-[10px] flex'>
          <span>Posted at:</span>
          <span className='font-bold'>Loading date...</span>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Loading
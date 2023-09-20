'use client'
import { Data } from '@/modules/modules'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import useSWR from 'swr'
import Loading from '../blog/loading'
import styles from './dashboard.module.css'

const Dashboard = () => {
  const session = useSession()
  const router = useRouter()

  //inputs values
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [img, setImg] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const fetcher = async <T = Data>(...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args)
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json() as T
  }

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher<Data>)

  if (session.status == "loading") {
    return <Loading />
  }
  if (session.status == "unauthenticated") {
    router?.push("/dashboard/login")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {

      await fetch('/api/posts', {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session?.data?.user?.name || 'nn',
        }),
      })
      mutate()
      setTitle('')
      setDesc('')
      setImg('')
      setContent('')
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      })
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  //onChange handlers
  const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const imgOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value)
  }

  const descOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
  }

  const contentOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  if (session.status == "authenticated") {
    return (
      <div className='flex w-screen h-screen items-center justify-between'>
        <p className='text-red-600'>{error}</p>
        <div className={styles.posts}>
          {data?.length !== undefined && data.length === 0 &&
            <span className=' flex justify-center items-center w-[1000px] text-[26px]'>No items.</span>}
          {isLoading ? <Loading /> : data?.map((post) => (
            <div className='flex justify-between items-center border w-[850px] rounded mb-[5px] overflow-hidden' key={post._id}>
              <Image src={post.img} alt={post.title} width={200} height={100} />
              <div className='flex flex-col ml-[20px] mr-[20px]'>
                <h2 className='font-bold text-[18px]'>{post.title}</h2>
                <p className='mt-[30px]'>{post.desc}</p>
              </div>
              <div className={styles.delete} title={`Delete post "${post.title}"`} onClick={() => handleDelete(post._id)}>
                <Image src='/Xmark.png' height={50} width={50} alt='X' />
              </div>
            </div>
          ))}
        </div>

        <form className={styles.new} onSubmit={handleSubmit}>
          <h1 className='font-bold text-[30px] mb-[20px]'>Add New Post</h1>
          <div>
            <p className='font-bold text-[20px]'>Title</p>
            <input
              type="text"
              placeholder="required"
              className={styles.input}
              value={title}
              onChange={titleOnChange}
              maxLength={50}
              required
            />
            <p className={styles.counter}>{title.length}/50</p>
          </div>

          <div>
            <p className='font-bold text-[20px]'>Image</p>
            <input
              type="text"
              placeholder="required"
              className={styles.input}
              value={img}
              onChange={imgOnChange}
              required
            />
          </div>

          <div>
            <p className='font-bold text-[20px]'>Description</p>
            <textarea
              placeholder="required"
              className={styles.inputDesc}
              value={desc}
              onChange={descOnChange}
              maxLength={100}
              required
            />
            <p className={styles.counter}>{desc.length}/100</p>
          </div>

          <div>
            <p className='font-bold text-[20px]'>Content</p>
            <textarea
              placeholder='required'
              className={styles.textArea}
              value={content}
              onChange={contentOnChange}
              maxLength={500}
              required
            />
            <p className={styles.counter}>{content.length}/500</p>
          </div>

          <button className='w-[340px] bg-[#62a21f] hover:bg-[#5c9420] h-[40px] rounded text-white text-[18px] transition-all'
          >Add</button>
        </form>


      </div>
    )
  }
  return null // this return for solve ts type problem in container component
}

export default Dashboard

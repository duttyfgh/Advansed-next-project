'use client'
import { Data } from '@/modules/modules'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import useSWR from 'swr'
import Loading from '../blog/loading'
import styles from './dashboard.module.css'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import InputField, { TextareaField } from '@/utils/InputField/InputField'


const Dashboard = () => {
  const session = useSession()
  const router = useRouter()

  const [modalWindow, setModalWindow] = useState<boolean>(false)

  const openModalWindow = () => {
    setModalWindow(true)
  }

  const closeModalWindow = () => {
    setModalWindow(false)
  }

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

  const handleSubmit = async (value: IValues) => {
    try {
      await fetch('/api/posts', {
        method: "POST",
        body: JSON.stringify({
          title: value.Title,
          desc: value.Description,
          img: value.Image,
          content: value.Content,
          username: session?.data?.user?.name || 'nn',
        }),
      })
      mutate()
      closeModalWindow()
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

  interface IValues {
    Title: string
    Image: string
    Description: string
    Content: string
  }

  const Schema = Yup.object().shape({
    Title: Yup.string()
      .required('Title required field!'),

    Image: Yup.string()
      .required('Image required field!')
      .url('This should be a link!'),

    Description: Yup.string()
      .required('Description required field!'),
    Content: Yup.string()
      .required('Content required field!')
  })



  if (session.status == "authenticated") {
    return (
      <div className='flex h-screen items-center justify-center flex-col'>
        <p className='text-red-600'>{error}</p>
        <div className={styles.posts}>
          {data?.length !== undefined && data.length === 0 &&
            <span className=' flex justify-center items-center w-[1000px] text-[26px]'>No items.</span>}
          {isLoading ? <Loading /> : data?.map((post) => (
            <div className={styles.card} key={post._id}>
              <Image src={post.img} alt={post.title} width={200} height={100} className={styles.img} />
              <div className={styles.cardTextBlock}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.desc}>{post.desc}</p>
              </div>
              <div className={styles.delete} title={`Delete post "${post.title}"`} onClick={() => handleDelete(post._id)}>
                <Image src='/Xmark.png' height={40} width={40} alt='X' />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.buttons}>
          <div
            title='Click to add new post'
            className='bg-[#62a21f] hover:bg-[#5c9420] px-[20px] py-[10px] rounded-[8px] flex gap-[10px] items-center cursor-pointer'
            onClick={openModalWindow}>
            <span className='text-white text-[18px]'>Create new post</span>
            <Image src='/plus.png' width={20} height={10} alt='+' className='whiteVector h-[19px]' />
          </div>
          <button 
            title='Click to add new post'
            className='bg-[#62a21f] hover:bg-[#5c9420] px-[20px] py-[10px] rounded-[8px] flex gap-[10px] items-center cursor-pointer justify-evenly'
            onClick={() => signOut() as unknown as React.MouseEventHandler<HTMLButtonElement>}>
            <span className='text-white text-[18px]'>Login out</span>
            <Image src='/log.png' width={30} height={30} alt='->]' className='whiteVector' />
          </button>
        </div>

        {modalWindow && <div className={styles.modelWindow}>
          <div className={`${styles.new} default`}>
            <h1 className='font-bold text-[30px] mb-[20px]'>Add New Post</h1>
            <Formik
              initialValues={{
                Title: '',
                Image: '',
                Description: '',
                Content: ''
              }}
              validationSchema={Schema}
              onSubmit={handleSubmit}
              validateOnChange={false}
            >
              {({ values, errors, touched, handleChange }) => (
                <Form >
                  <div className={styles.titleInput}>
                    <InputField
                      text={'Title'}
                      error={errors.Title as string}
                      touched={touched.Title as boolean}
                      type={'text'}
                      placeholder={'Enter title...'}
                      name={'Title'}
                      onChange={handleChange}
                      value={values.Title}
                      title='Enter title for your post'
                      maxLength={50}
                    />
                    <p className='w-[100%] text-end'>{values.Title.length}/50</p>
                  </div>
                  <div className={styles.image}>
                    <InputField
                      text={'Image'}
                      error={errors.Image as string}
                      touched={touched.Image as boolean}
                      type={'text'}
                      placeholder={'Enter img url...'}
                      name={'Image'}
                      onChange={handleChange}
                      value={values.Image}
                      title='Enter url on your img'
                    />
                  </div>
                  <div className={styles.description}>
                    <InputField
                      text={'Description'}
                      error={errors.Description as string}
                      touched={touched.Description as boolean}
                      type={'text'}
                      placeholder={'Enter description...'}
                      name={'Description'}
                      onChange={handleChange}
                      value={values.Description}
                      title='Enter description for your post'
                      maxLength={100}
                    />
                    <p className='w-[100%] text-end'>{values.Description.length}/100</p>

                  </div>
                  <div className={styles.content}>
                    <TextareaField
                      text={'Content'}
                      error={errors.Content as string}
                      touched={touched.Content as boolean}
                      placeholder={'Enter content...'}
                      name={'Content'}
                      onChange={handleChange}
                      value={values.Content}
                      title='Enter main text for your post'
                      maxLength={500}
                    />
                    <p className='w-[100%] text-end'>{values.Content.length}/500</p>
                  </div>
                  <button
                    className='w-[100%] bg-[#62a21f] hover:bg-[#5c9420] h-[40px] rounded text-white text-[18px] transition-all'
                    title='Click to create the post'
                  >Add</button>
                </Form>
              )}
            </Formik>
            <button
              className={styles.cancel}
              onClick={closeModalWindow}
              title='Click to cancel'
            >Cancel</button>
          </div>
        </div>
        }

      </div>
    )
  }
  return null // this return for solve ts type problem in container component
}

export default Dashboard

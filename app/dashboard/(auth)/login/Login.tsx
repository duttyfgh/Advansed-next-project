'use client'
import InputField from '@/utils/InputField/InputField'
import { Form, Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Loading from './loading'
import styles from './login.module.css'

interface IValues {
  Email: string
  Password: string
}

const Login = () => {
  const session = useSession()
  const router = useRouter()
  const [isPasswordEye, setIsPasswordEye] = useState<boolean>(false)


  if (session.status == "loading") {
    return <Loading />
  }
  if (session.status == "authenticated") {
    router?.push("/dashboard")
  }

  const Schema = Yup.object().shape({
    Email: Yup.string()
      .required('Email required field!')
      .email("Enter correct Email. Example 'username@gmail.com'"),

    Password: Yup.string()
      .required('Password required field!')
      .min(3, 'The password cannot be shorter than 3 characters!')
  })

  const handleSubmit = (values: IValues) => {

    signIn("credentials", {
      email: values.Email,
      password: values.Password
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.shell}>
        <div className={styles.text}>
          <h1 className='text-[34px]'>Login to account</h1>
          <h2 className={styles.subtitle}>Please login to account to see the dashboard.</h2>
        </div>
        <Formik
          initialValues={{
            Email: '',
            Password: ''
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className={styles.email}>
                <InputField
                  text={'Email'}
                  error={errors.Email as string}
                  touched={touched.Email as boolean}
                  type={'email'}
                  placeholder={'username@gmail.com'}
                  name={'Email'}
                  onChange={handleChange}
                  value={values.Email}
                  title='Enter your email'
                />
              </div>
              <div className={styles.password}>
                <InputField
                  text={'Password'}
                  error={errors.Password as string}
                  touched={touched.Password as boolean}
                  type={isPasswordEye ? 'text' : 'password'}
                  placeholder={'******'}
                  name={'Password'}
                  onChange={handleChange}
                  value={values.Password}
                  title='Enter your password'
                />
                {isPasswordEye
                  ? <Image
                    className='eye'
                    onClick={() => setIsPasswordEye(false)}
                    alt='eye'
                    src={'/eye.png'}
                    width={30}
                    height={30}
                    title='Hide password'
                  />
                  : <Image
                    className='eye'
                    onClick={() => setIsPasswordEye(true)}
                    alt='eyeSlash'
                    src={'/eye-slash.png'}
                    width={30}
                    height={30}
                    title='Show password'
                  />
                }
              </div>
              <button
                className={styles.button}
                type='submit'
                onAuxClick={(e) => {
                  e.preventDefault()
                  handleSubmit(values)
                }}
                title={`Login in account with email "${values.Email}"`}
              >Login in</button>
            </Form>
          )}
        </Formik>

        <div className='flex justify-center mt-[10px] text-[#656565]'>
          <span>Don't have an account yet?</span>
          <Link className={'hover:underline text-[#486924] ml-[5px]'} href="/dashboard/register" title='Go to registration'>
            Register
          </Link>
        </div>

        <div className={styles.or}>
          <p>or</p>
        </div>

        <button onClick={() => signIn('google')} className={styles.googleLogin} title='Login with Google'>
          <Image
            src='/google.png'
            alt='...'
            width={30}
            height={30} />
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login
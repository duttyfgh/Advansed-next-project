'use client'
import { generateMetadata } from '@/app/layout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styles from './register.module.css'
import InputField from '@/utils/InputField/InputField'
import Image from 'next/image'

interface IValues {
  Login: string
  Email: string
  Password: string
}

const Register = () => {
  const [error, setError] = useState<string | unknown>()
  const [isPasswordEye, setIsPasswordEye] = useState<boolean>(false)

  const router = useRouter()

  const Schema = Yup.object().shape({
    Login: Yup.string()
      .min(3, 'Login cannot have less than 3 characters!')
      .max(16, 'Login cannot have more than 16 characters!')
      .required('Login is a required field!')
      .matches(
        /[a-zA-z]$/,
        'The password must contain only Latin letters.'),

    Email: Yup.string()
      .required('Email required field!')
      .email("Enter correct Email. Example 'username@gmail.com'"),

    Password: Yup.string()
      .required('Password required field!')
      .min(6, 'The password cannot be shorter than 6 characters!')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).*$/,
        'The password must contain only Latin letters and numbers.'),

  })

  const handleSubmit = async (values: IValues) => {
      try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: values.Login,
          email: values.Email,
          password: values.Password
        }),
      })
      res.status === 201 &&
        router.push("/dashboard/login?success=Account has been created")
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      {/*@ts-ignore - непонимаю как решить*/}
      <div className={styles.shell}>
        <div className={styles.text}>
          <h1 className='text-[34px]'>Create an Account</h1>
          <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
        </div>

        <Formik
          initialValues={{
            Login: '',
            Email: '',
            Password: ''
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <div className={styles.login}>
                <InputField
                  text={'Login'}
                  error={errors.Login as string}
                  touched={touched.Login as boolean}
                  type={'text'}
                  placeholder={'username'}
                  name={'Login'}
                  onChange={handleChange}
                  value={values.Login}
                  title='Enter your login'
                   />
              </div>
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
                title='Create account'
              >Create account</button>
            </Form>
          )}
        </Formik>


        {error as boolean && <span className='text-red'>Something went wrong!</span>}
        <div className='flex justify-center mt-[10px] text-[#656565]'>
          <span>Already have an account?</span>
          <Link className={'hover:underline text-[#486924] ml-[5px]'} href="/dashboard/login" title='Go to login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Register
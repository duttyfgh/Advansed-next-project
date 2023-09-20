import { generateMetadata } from '@/app/layout'
import React from 'react'
import Register from './Register'

export const metadata = generateMetadata('Register')

const RegisterContainer = () => {
  return (
    <>
      <Register />
    </>
  )
}

export default RegisterContainer
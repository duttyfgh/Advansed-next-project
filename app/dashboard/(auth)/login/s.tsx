import { generateMetadata } from '@/app/layout'
import Login from './Login'

export const metadata = generateMetadata('Login')

const LoginContainer = () => {
  return (
    <>
      <Login />
    </>
  )
}

export default LoginContainer
export interface post {
  _id: number
  username: string
  title: string
  desc: string
  content: string
  img: string
  createdAt: string
}

export interface ProfileData {
  id: number
  title: string
  desc: string
  image: string
}

export interface ProfileDataArray {
  applications: ProfileData[]
  illustrations: ProfileData[]
  websites: ProfileData[]
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export type Data = post[]


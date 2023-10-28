export interface UserState {
  users: User[]
  userDetail: User
  meta: Meta
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface Meta {
  page: number
  total: number
  total_pages: number
  per_page: number
}

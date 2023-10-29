export interface UserState {
  users: User[]
  userDetail: User
}

export interface User {
  id: number | string
  email: string
  first_name: string
  last_name: string
  avatar: string
}

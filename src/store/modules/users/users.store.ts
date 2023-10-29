import axios, { type AxiosResponse } from 'axios'
import type { UserState, User } from './types'

const state: UserState = {
  users: [] as User[],
  userDetail: {} as User
}

const mutations = {
  SET_USERS(state: UserState, users: User[]) {
    state.users = users
  }
}

// Make here 2 requests because query param 'per_page' is not working on server
const actions = {
  async getUsersList({ commit }: { commit: Function }) {
    try {
      const response1: AxiosResponse = await axios.get(`https://reqres.in/api/users?page=1`)
      const response2: AxiosResponse = await axios.get(`https://reqres.in/api/users?page=2`)
      const usersList: User[] = [...response1.data.data, ...response2.data.data]

      commit('SET_USERS', usersList)
      localStorage.setItem('users', JSON.stringify(usersList))
    } catch (error) {
      console.error('Get users error', error)
    }
  },

  loadLocalUsers({ commit }: { commit: Function }) {
    const localUsers: string | null = localStorage.getItem('users')
    if (localUsers) {
      commit('SET_USERS', JSON.parse(localUsers))
      return true
    }
  },

  loadLocalUser({ commit, state }: { commit: Function; state: UserState }, userId: number) {
    const localUsers: string | null = localStorage.getItem('users')

    if (localUsers) {
      commit('SET_USERS', JSON.parse(localUsers))
      state.userDetail = state.users.find((user: User): boolean => user.id == userId) as User
      return true
    }
  },

  updateLocalUser({ state }: { state: UserState }, updatedUser: User) {
    let updatedUsersList: User[] = state.users.map(
      (item: User): User => (item.id === updatedUser.id ? updatedUser : item)
    )
    localStorage.setItem('users', JSON.stringify(updatedUsersList))
  },

  deleteLocalUser({ state }: { state: UserState }, id: number) {
    state.users = state.users.filter((user: User): boolean => user.id != id)
    localStorage.setItem('users', JSON.stringify(state.users))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

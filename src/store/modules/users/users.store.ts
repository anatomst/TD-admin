import axios from 'axios'
import type { UserState, User, Meta } from './types'

const state: UserState = {
  users: [],
  meta: {} as Meta,
  userDetail: {} as User
}

const mutations = {
  SET_USERS(state: UserState, users: User[]) {
    state.users = users
  },
  SET_META(state: UserState, meta: Meta) {
    state.meta = meta
  },
  DELETE_USER(state: UserState, id: number) {
    state.users = state.users.filter((item: User) => item.id !== id)
  },
  SET_USER(state: UserState, userDetail: User) {
    state.userDetail = userDetail
  },
  UPDATE_USER(state: UserState, user: User) {
    state.userDetail = user
  }
}

const actions = {
  async getUsersList({ commit }: { commit: Function }, page: number) {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}?per_page=12`)
      commit('SET_USERS', response.data.data)
      commit('SET_META', {
        page: response.data.page,
        total: response.data.total,
        total_pages: response.data.total_pages,
        per_page: response.data.per_page
      })
    } catch (error) {
      console.error('Get users error', error)
    }
  },
  async getUser({ commit }: { commit: Function }, id: number) {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`)
      commit('SET_USER', response.data.data)
    } catch (error) {
      console.error('Get user error', error)
    }
  }
  //with axios
  // async updateUser({ commit }: { commit: Function }, item: object) {
  //   try {
  //     const response = await axios.put(`https://reqres.in/api/users/${item.id}`, item)
  //     commit('UPDATE_USER', response.data)
  //   } catch (error) {
  //     console.error('Updating error', error)
  //   }
  // }

  //with axios
  // async deleteUser({ commit }, id: number) {
  // try {
  //   await axios.delete(`https://reqres.in/api/users/${id}`)
  //   commit('DELETE_USER', id)
  // } catch (error) {
  //   console.error('Delete error', error)
  // }
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

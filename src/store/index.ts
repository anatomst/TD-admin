import { createStore } from 'vuex'
import usersStore from './modules/users/users.store'
const store = createStore({
  modules: {
    usersStore
  }
})

export default store

import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter: false,
    isCollapse: false,
    UserInfo: { }
  },
  getters: {
  },
  mutations: {
    changeGetterRouter (state, value) {
      state.isGetterRouter = value
    },
    changeCollapsed (state) {
      state.isCollapse = !state.isCollapse
    },
    changeUserInfo (state, value) {
      state.UserInfo = {
        ...state.UserInfo,
        ...value
      }
    },
    clearUserInfo (state, value) {
      state.UserInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['isCollapse', 'UserInfo']
    })
  ]

})

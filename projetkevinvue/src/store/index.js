import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: !!localStorage.getItem('token') 

  },
  getters: {
    
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value;
  },

},
  actions: {
  },
  modules: {
  },
})

import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
      CreatePersistedState()
  ],
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    token: null,
    user: null,
    isUserLoggedIn: false,
    respondentIdEdit: null,
    userRoleId: null,
    customMessageEditId: null
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    setToken (state, token) {
      state.token = token

      if(token){
          state.isUserLoggedIn = true
      } else {
          state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
        state.user = user
    },
    setRespondentIdEdit(state, id) {
      state.respondentIdEdit = id
    },
    setUserRoleId(state, id) {
      state.userRoleId = id
    },
    setCustomMessageEditId(state, id) {
      state.customMessageEditId = id
    }
  },

  actions: {
    setToken({commit}, token) {
      commit('setToken', token)
    },
    setUser({commit}, user) {
      commit('setUser', user)
    },
    setRespondentIdEdit({commit}, id) {
      commit('setRespondentIdEdit', id)
    },
    setUserRoleId({commit}, id) {
      commit('setUserRoleId', id)
    },
    setCustomMessageEditId({commit}, id) {
      commit('setCustomMessageEditId', id)
    }
  },
})

import axios from 'axios'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async GET_USER ({ commit }) {
    const { data } = await axios.get(process.env.BASE_URL + '/api/auth/currentUser')
    commit('setUser', data.user)
  }
}

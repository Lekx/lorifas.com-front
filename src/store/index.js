import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    alert: {
      type: 'info',
      secs: 0,
      msg: 'Set a message'
    }
  },
  mutations: {
    toggleLoader (state, payload) {
      state.loading = payload
    },
    setAlert (state, payload) {
      state.alert.type = payload.type ?? state.alert.type
      state.alert.secs = payload.secs ?? 5000
      state.alert.msg = payload.msg
      setTimeout(() => {
        state.alert.secs = 0
      }, state.alert.secs)
    }
  },
  actions: {
    // async sendContactEmail ({ commit }, data) {
    //   commit('toggleLoader', true)
    //   await axios.post('https://apis.webrocket.services/v1/erent/contact', data).then(() => {
    //     commit('setAlert', { msg: 'Hemos recibido tu mensaje, te contactaremos pronto.', type: 'success', secs: 10000 })
    //   }).catch((error: any) => {
    //     commit('setAlert', { msg: 'Hubo un error al enviar tu mensaje.', type: 'danger' })
    //     console.log(error)
    //   }).finally(() => {
    //     commit('toggleLoader', false)
    //   })
    // }
  },
  modules: {
  },
  getters: {
    getLoaderState: state => {
      return state.loading
    },
    getAlert: state => {
      return state.alert
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  recent_file: "",
  recent_folder: "",
  recent_list: [],
  fullscreen: false
}

const mutations = {
  CHANGE_FILE(state, file) {
    state.recent_file = file
  },
  CHANGE_FOLDER(state, folder) {
    state.recent_folder = folder
  },
  CHANGE_FILELIST(state, list) {
    state.recent_list = list
  },
  CHANGE_FULLSCREEN(state) {
    state.fullscreen = !state.fullscreen
  }
}

const actions = {
  CHANGE_FILE(context, file) {
    context.commit('CHANGE_FILE', file)
  },
  CHANGE_FOLDER(context, folder) {
    context.commit('CHANGE_FOLDER', folder)
  },
  CHANGE_FILELIST(context, list) {
    context.commit('CHANGE_FILELIST', list)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
// import permission from './modules/permission'
// import tagsView from './modules/tagsView'
// import user from './modules/user'
import routemap from './modules/routemap'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    // permission,
    // tagsView,
    // user,
    routemap
  },
  getters
})

export default store

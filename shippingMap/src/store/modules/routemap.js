import { allbackNew } from '@/api/routemap'

const user = {
  state: {
    allbackNew: '',
    shipImo: '',
    isSetCenter: false,
    minimizeWindows: [],
    shipInfos: Object
  },

  mutations: {
    SET_BACK_NEW: (state, data) => {
      state.allbackNew = data
    },
    SET_IMO: (state, data) => {
      state.shipImo = data
    },
    SEARCH_IMO: (state, data) => {
      state.isSetCenter = true
      state.shipImo = data
    },
    MINIMIZE_WINDOWS: (state, data) => {
      const flagArr = state.minimizeWindows
      const flag = flagArr.findIndex(item => item.routeName === data.routeName)
      if (flag === -1) {
        flagArr.push(data)
      } else {
        flagArr.splice(flag, 1, data)
      }
      state.minimizeWindows = flagArr
    },
    SHIP_INFOS: (state, data) => {
      state.shipInfos = data
    }
  },

  actions: {
    // 用户名登录
    getBackNew({ commit }, payload) {
      return new Promise((resolve, reject) => {
        allbackNew().then(response => {
          const data = response.data.datas
          commit('SET_BACK_NEW', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    setImo({ commit }, payload) {
      commit('SET_IMO', payload)
    },
    setSearchImo({ commit }, payload) {
      commit('SEARCH_IMO', payload)
    },
    minimizeWindows({ commit }, payload) {
      commit('MINIMIZE_WINDOWS', payload)
    },
    shipInfos({ commit }, payload) {
      commit('SHIP_INFOS', payload)
    }
  }
}

export default user

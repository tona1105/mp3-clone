import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listPlay: null,
    typePlay: null,
    idPlay: null
  },
  mutations: {
    updateSharedData(state, {data,type,num}) {
      state.listPlay = data;
      state.typePlay = type
      state.idPlay = num;
    },
    nextPlay(state) {
      const listLength = state.listPlay.length
      console.log(listLength);
      if (state.idPlay === listLength - 1) {
        state.idPlay = 0
      }
      else state.idPlay++
    },
    previousPlay(state) {
      const listLength = state.listPlay.length
      if (state.idPlay === 0) {
        state.idPlay = listLength - 1
      }
      state.idPlay--
    },
    randomPlay(state) {{
      const length = state.listPlay.length
      const randomNum = Math.floor(Math.random() * length)
      console.log(randomNum);
      state.idPlay = randomNum
    }}
  },
  getters: {
    getPlaylist(state) {
      return state.listPlay;
    },
    getIdPlay(state) {
      if(state.idPlay) {
        return state.listPlay[state.idPlay].title
      }
    }
  }

});

export default store
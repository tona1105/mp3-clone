import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listPlay: null,
    idPlay: null,
    audioInfo: {
      src: '',
      itemThumb: '',
      itemTitle: '',
      itemArtist: '',
      isPlayed: false,
      vol: 100,
      progress: 0,
      isLoop: false,
      isRandom: false,
    },
    infoTop10: null
  },
  mutations: {
    updateAudioInfo(state) {
      state.audioInfo.src = state.listPlay[state.idPlay].source,
        state.audioInfo.itemThumb = state.listPlay[state.idPlay].thumbnail,
        state.audioInfo.itemTitle = state.listPlay[state.idPlay].title,
        state.audioInfo.itemArtist = state.listPlay[state.idPlay].artistsNames
    },
    updatePlayorPause(state, status) {
      state.audioInfo.isPlayed = status
    },
    updateRandomOrNot(state, status) {
      state.audioInfo.isRandom = status
    },
    updateVol(state, vol) {
      state.audioInfo.vol = vol
    },
    updateProgress(state, progress) {
      state.audioInfo.progress = progress
    },
    changeProgress(state, progress) {
      state.audioInfo.progress = progress
    },
    updateSharedData(state, { data, num }) {
      state.listPlay = data;
      state.idPlay = num;
    },
    updateInfoTop10(state, data) {
      state.infoTop10 = data
    },
    nextPlay(state) {
      const listLength = state.listPlay.length
      if (state.idPlay === listLength - 1) {
        state.idPlay = 0
      }
      else state.idPlay++
      state.ref = state.idPlay
    },
    previousPlay(state) {
      const listLength = state.listPlay.length
      console.log(listLength);
      if (state.idPlay === 0) {
        state.idPlay = listLength
      }
      else state.idPlay--
      state.ref = state.idPlay
    },
    randomPlay(state) {
      {
        const length = state.listPlay.length
        const randomNum = Math.floor(Math.random() * length)
        console.log(randomNum);
        state.idPlay = randomNum
        state.ref = state.idPlay
      }
    }
  },
  getters: {
    getPlaylist(state) {
      return state.listPlay;
    },
    getIdPlay(state) {
      if (state.listPlay) {
        return state.listPlay[state.idPlay].title
      }
    },
    getRefPlay(state) {
      if (state.ref) {
        return state.ref
      }
    },
    audioInfo(state) {
      return state.audioInfo
    }
  }

});

export default store
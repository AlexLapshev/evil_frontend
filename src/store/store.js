import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      main_loading: false,
      add_playlist_form: false,
      add_track_to_playlist_form: false,
      track_to_add_in_playlist: null
    },
    mutations: {
      SET_LOADING: (state) => {
        state.main_loading = !state.main_loading
      },
      SET_ADD_PLAYLIST_FROM: (state) => {
        state.add_playlist_form = !state.add_playlist_form
      },
      SET_ADD_TRACK_TO_PLAYLIST_FORM: (state) => {
        state.add_track_to_playlist_form = !state.add_track_to_playlist_form
      },
      SET_TRACK_ADD_TO_PLAYLIST: (state, {trackId}) => {
        state.track_to_add_in_playlist = trackId
      }
    },
    getters: {
      mainLoading: (state) => {
        return state.main_loading
      },
      addPlaylistForm: (state) => {
        return state.add_playlist_form
      },
      addTrackToPlaylistForm: state => {
        return state.add_track_to_playlist_form
      },
      trackToAddInPlaylist: state => {
        return state.track_to_add_in_playlist
      }
    },
    actions: {
      changeMainLoading: (context) => {
        console.log('changing loading')
        context.commit('SET_LOADING')
      },
      changeAddToPlaylistForm: (context) => {
        context.commit('SET_ADD_PLAYLIST_FROM')
      },
      changeAddTrackToPlaylistForm: (context) => {
        context.commit('SET_ADD_TRACK_TO_PLAYLIST_FORM')
      },
      changeTrackAddToPlaylist: (context, {trackId}) => {
        context.commit('SET_TRACK_ADD_TO_PLAYLIST', {trackId:trackId})
      }
    },
    modules: {
      user
    }
  }
)

export default store;

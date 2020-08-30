import axios from 'axios'

export default {
  methods: {
    getUserPlaylists: function (access_token) {
      return axios.get(process.env.VUE_APP_BASE_URL + '/users/me', {
        headers: {
          "Authorization": "Bearer " + access_token
        }
      })
    },
    getTrack: function (trackId) {
      return axios.get(process.env.VUE_APP_BASE_URL + '/tracks/' + trackId)
    },
    getArtist: function (artistId) {
      return axios.get(process.env.VUE_APP_BASE_URL + '/artists/' + artistId)
    },
    getRelease: function (releaseId) {
      return axios.get(process.env.VUE_APP_BASE_URL + '/stream/releases/' + releaseId)
    },
  }
}

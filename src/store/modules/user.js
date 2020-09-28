const state = {
  user_name: '',
  user_access_token: '',
  user_playlist: {},
  user_playlists: [],
  user_artists: [],
  user_releases: [],
  user_tracks: []
};

const getters = {
  userAccessToken: state => {
    return state.user_access_token
  },
  userName: state => {
    return state.user_name
  },
  userTracks: state => {
    return state.user_tracks
  },
  userPlaylist: state => {
    return state.user_playlist
  },
  userPlaylists: state => {
    return state.user_playlists
  },
  USER_PLAYLIST_IDS: state => {
    const playlists = state.user_playlists
    const playlistIds = playlists.map(playlist => {
      return playlist.playlist_id
    })
    return playlistIds
  },
  userTrackIds: state => {
    const tracks = state.user_tracks
    const trackIds = tracks.map(track => {
      return track.track_id
    })

    return trackIds
  },
  userArtists: state => {
    return state.user_artists
  },
  userArtistIds: state => {
    const artists = state.user_artists
    const artistIds = artists.map(artist => {
      return artist.artist_id
    })
    return artistIds
  },
  userReleases: state => {
    return state.user_releases
  },
  userReleaseIds: state => {
    console.log(state.user_releases)
    const releases = state.user_releases
    const releaseIds = releases.map(release => {
      return release.release_id
    })

    return releaseIds
  },
};

const mutations = {
  SET_USER_ACCESS_TOKEN: (state, accessToken) => {
    state.user_access_token = accessToken;
  },
  SET_USER_USERNAME: (state, userName) => {
    state.user_name = userName
  },
  SET_USER_ARTISTS: (state, artists) => {
    state.user_artists = artists;
  },
  SET_USER_RELEASES: (state, releases) => {
    state.user_releases = releases;
  },
  SET_USER_TRACKS: (state, tracks) => {
    state.user_tracks = tracks;
  },
  SET_USER_PLAYLISTS: (state, userPlaylists) => {
    state.user_playlists = userPlaylists;
  },
  SET_USER_PLAYLIST: (state, {playlist}) => {
    state.user_playlist = playlist
  },
  DELETE_TRACK_FROM_PLAYLIST: (state, {trackId, playlistId}) => {
    const playlistIndex = state.user_playlists.findIndex(el => el.playlist_id === Number(playlistId))
    for (let [index, track] of state.user_playlists[playlistIndex].tracks.entries()) {
      if (track === Number(trackId)) {
        state.user_playlists[playlistIndex].tracks.splice(index, 1)
        break
      }
    }
  },
  DELETE_TRACK_FROM_LIKED: (state, trackId) => {
    for (let [index, track] of state.user_tracks.entries()) {
      if (track.track_id === Number(trackId)) {
        state.user_tracks.splice(index, 1)
        break
      }
    }
  },
  ADD_TRACK_TO_USER_TRACKS: (state, track) => {
    state.user_tracks.push(track)
  },
  ADD_ARTIST_TO_USER_ARTISTS: (state, artist) => {
    state.user_artists.push(artist)
  },
  DELETE_ARTIST_FROM_USER_ARTISTS: (state, artistId) => {
    for (let [index, artist] of state.user_artists.entries()) {
      if (artist.artist_id === Number(artistId)) {
        state.user_artists.splice(index, 1)
        break
      }
    }
  },
  REMOVE_USER_PLAYLIST: (state, playlistId) => {
    for (let [index, playlist] of state.user_playlists.entries()) {
      if (playlist.playlist_id === Number(playlistId)) {
        state.user_playlists.splice(index, 1)
        break
      }
    }
  },
  ADD_TRACK_TO_PLAYLIST: (state, {playlistId, trackId}) => {
    for (let [index, playlist] of state.user_playlists.entries()) {
      if (playlist.playlist_id === Number(playlistId)) {
        state.user_playlists[index].tracks.push(trackId)
        break
      }
    }
  },
  ADD_RELEASE_TO_USER_RELEASES: (state, {release}) => {
    state.user_releases.push(release)
  },
  DELETE_RELEASE_FROM_USER_RELEASES: (state, {releaseId}) => {
    for (let [index, release] of state.user_releases.entries()) {
      if (release.release_id === Number(releaseId)) {
        state.user_releases.splice(index, 1)
        break
      }
    }
  }

};

const actions = {
  getUserInfo: (context, vm) => {
    vm.$axios.get('/users/me', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('access_token')
      }
    }).then((response) => {
      context.commit('SET_USER_ACCESS_TOKEN', localStorage.getItem('access_token'))
      context.commit('SET_USER_USERNAME', response.data.username)
      context.commit('SET_USER_ARTISTS', response.data.artists)
      context.commit('SET_USER_RELEASES', response.data.releases)
      context.commit('SET_USER_TRACKS', response.data.tracks)
      context.commit('SET_USER_PLAYLISTS', response.data.playlists)
    }).catch(function (err) {
      if (err.response.data.error === 'Token has expired') {
        vm.$axios.post('/refresh-token', {}, {
          headers: {
            "refresh_token": localStorage.getItem('refresh_token')
          }
        }).then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          context.dispatch('getUserInfo', vm)
        }).catch(err => {
          if (err.response.data === 'refresh-token has expired') {

          }
        })
      }
    })
  },
  getUserPlaylists: (context, vm) => {
    if (!state.user_playlists) {
      vm.$axios.get('playlists/').then(response => {
        context.commit('SET_USER_PLAYLISTS', response.data)
      })
    }
  },
  getUserPlaylist: (context, {playlistId, vm}) => {
    if (localStorage.getItem('access_token')) {
      vm.$axios.get(`/playlist/${playlistId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('access_token')
        }
      }).then(response => {
        context.commit('SET_USER_PLAYLIST', {playlist: response.data})
      })
    } else {
      vm.$axios.get(`/playlist/${playlistId}`).then(response => {
          context.commit('SET_USER_PLAYLIST', {playlist: response.data})
        }
      )
    }
  },
  removeTrackFromPlaylist: (context, {playlistId, trackId, vm}) => {
    vm.$axios.delete('/users/playlist/' + playlistId, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('access_token')
      },
      params: {
        track_id: trackId
      }
    }).then(response => {
      context.commit('DELETE_TRACK_FROM_PLAYLIST', {trackId: trackId, playlistId: playlistId})
    })
  },
  likeTrack: (context, {trackId, vm}) => {
    const url = `/users/track/${trackId}/like`
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }
    if (!context.getters.userTrackIds.includes(trackId)) {
      vm.$axios.post(url, {}, {headers: headers}).then(response => {
        vm.$axios.get(`/tracks/${trackId}`).then(response => {
          context.commit('ADD_TRACK_TO_USER_TRACKS', response.data)
        })
      }).catch(err => {
        if (err.response.status === 401) {
          vm.$router.push('/login')
        }
      })
    } else {
      vm.$axios.delete(url, {
        headers: headers,
        data: {}
      }).then(response => {
        context.commit('DELETE_TRACK_FROM_LIKED', trackId)
      })
    }
  },
  subscribeArtist: (context, {artistId, vm}) => {
    const url = `/users/artist/${artistId}/subscribe`
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }
    if (!context.getters.userArtistIds.includes(artistId)) {
      vm.$axios.post(url, {}, {headers: headers}).then(response => {
        vm.$axios.get(`/artists/${artistId}`).then(response => {
          context.commit('ADD_ARTIST_TO_USER_ARTISTS', response.data)
        })
      }).catch(err => {
        if (err.response.status === 401) {
          vm.$router.push('/login')
        }
      })
    } else {
      vm.$axios.delete(url, {
        headers: headers,
        data: {}
      }).then(response => {
        context.commit('DELETE_ARTIST_FROM_USER_ARTISTS', artistId)
      })
    }
  },
  removeUserPlaylist(context, {playlistId, vm}) {
    vm.$axios.delete('/users/playlists',
      {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('access_token')
        },
        params: {
          playlist_id: playlistId
        }
      }).then(response => {
      context.commit('REMOVE_USER_PLAYLIST', playlistId)
    })
  },
  addTrackToPlaylist: (context, {playlistId, trackId, vm}) => {
    const playlist = context.state.user_playlists.find(el => el.playlist_id === Number(playlistId))

    if (!playlist.tracks.includes(trackId)) {
      vm.$axios.post('/users/playlist/' + playlistId, {}, {
        headers: {
          'Authorization': "Bearer " + localStorage.getItem('access_token')
        },
        params: {
          track_id: trackId
        }
      }).then(response => {
        context.commit('SET_ADD_TRACK_TO_PLAYLIST_FORM')
        context.commit('SET_TRACK_ADD_TO_PLAYLIST', {trackId: null})
        context.commit('ADD_TRACK_TO_PLAYLIST', {playlistId: playlistId, trackId: trackId})
      })
    }
  },
  likeRelease: (context, {releaseId, vm}) => {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('access_token')
    }
    const url = `/users/release/${releaseId}/like`
    if (context.getters.userReleaseIds.includes(Number(releaseId))) {
      vm.$axios.delete(url,
        {
          headers: headers
        }).then(response=>{
          context.commit('DELETE_RELEASE_FROM_USER_RELEASES', {releaseId: releaseId})
      })
    } else {
      vm.$axios.post(url, {},
        {
          headers: headers
        }).then(response => {
        vm.$axios.get('/stream/releases/' + releaseId).then(response => {
          const trackIds = response.data.tracks.map(track => {
            return track.track_id
          })
          response.data.tracks = trackIds
          context.commit('ADD_RELEASE_TO_USER_RELEASES', {release: response.data})
        })
      })
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};

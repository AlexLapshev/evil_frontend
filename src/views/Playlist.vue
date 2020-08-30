<template>
  <div class="main">
    <div class="music-field">
      <h2>#{{ playlistName}}</h2>
      <TracksPlaylist v-on:removeTrackFromPlaylist="removeFromPlaylist"
                      :playlistTracks="playlistTracks"></TracksPlaylist>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import TracksPlaylist from "../components/tracks/TrackPlaylist";
  import router from "../router";

  export default {
    name: "Playlist",
    data() {
      return {
        playlistId: this.$route.params.id,
        access_token: localStorage.getItem("access_token"),
        playlistName: '',
        playlistTracks: {},
      }
    },
    components: {
      TracksPlaylist,
    },
    props: ['id'],
    methods: {
      getData: function () {
        this.playlistRequest().then((response) => {
          this.playlistName = response.data.playlist_name
          this.playlistTracks = response.data.tracks
        }).catch((err) => {
          router.push('/artists')
        })
      },

      playlistRequest: function () {
        let config = {}
        if (this.access_token) {
          config['headers'] = {"Authorization": "Bearer " + this.access_token}
        }
        return axios.get(process.env.VUE_APP_BASE_URL + '/playlist?id=' + this.playlistId, config)
      },
      removeFromPlaylist: function (track) {
        axios.delete(process.env.VUE_APP_BASE_URL + "/playlist", {
          headers: {
            "Authorization": "Bearer " + this.access_token
          },
          data: {
            "playlist_id": this.playlistId,
            "track_id": track.id
          }
        }).then((response) => {
          if (response.status === 200) {
            this.playlistTracks.splice(this.playlistTracks.indexOf(track), 1)
          }
        })
      },
    },
    mounted() {
      this.getData()
    },
  }
</script>

<template>
  <div v-if="$store.getters.userAccessToken && $store.getters.USER_PLAYLIST_IDS.includes(playlistId)">
    <h1>#{{userPlaylist.playlist_name}}</h1>
    <track-item
      v-for="trackId in userPlaylist.tracks"
      :trackId="trackId"
      :key="trackId"
    >
    </track-item>
  </div>
  <div v-else>
    <h1>#{{playlist.playlist_name}}</h1>
    <track-item
      v-for="track in playlist.tracks"
      :trackId="track.track_id"
    >
    </track-item>
  </div>
</template>

<script>
  import TrackItem from "../components/tracks/TrackItem";

  export default {
    name: "Playlist",
    components: {
      TrackItem,
    },
    data() {
      return {
        playlistId: Number(this.$route.params.id),
        playlist: {},
        tracks: {}
      }
    },
    computed: {
      userPlaylist() {
        return this.$store.getters.userPlaylists.find(el => el.playlist_id === Number(this.playlistId))
      }
    },
    mounted() {
      if (!localStorage.getItem('access_token') || !this.$store.getters.USER_PLAYLIST_IDS.includes(this.playlistId)) {
        this.$axios('/playlists/' + this.playlistId).then(response => {
          this.playlist = response.data
        })
      }
    },
  }
</script>

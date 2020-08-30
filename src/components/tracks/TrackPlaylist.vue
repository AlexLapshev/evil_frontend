<template>
  <div>
    <div class="playlist-wrapper" v-for="track in playlistTracks" :key="track.id">
      <Track :trackId="track.id"></Track>
      <span v-if="userPlaylist" class="track-field__remove-btn" @click="removeTrack(track)">
        <span class="iconify remove-btn" data-icon="clarity:remove-line" data-inline="false"></span>
      </span>
    </div>
  </div>
</template>


<script>
  import Track from "./Track";
  import AxiosMixins from "../../../mixins/AxiosMixins";

  export default {
    props: ['playlistTracks'],
    name: "TrackPlaylist",
    mixins: [
      AxiosMixins
    ],
    data() {
      return {
        access_token: localStorage.getItem("access_token"),
        playlistId: '',
        playlistIds: []
      }
    },
    components: {Track},
    methods: {
      removeTrack: function (track) {
        this.$emit('removeTrackFromPlaylist', track)
      }
    },
    computed: {
      userPlaylist: function () {
        return this.playlistIds.includes(this.playlistId)
      }
    },
    mounted() {
      this.playlistId = this.$route.params.id
      if (this.access_token) {
        this.getUserPlaylists(this.access_token).then((response) => {
          const playlists = response.data.playlists
          playlists.forEach((playlist) => {
            this.playlistIds.push(playlist.id)
          })
        })
      }

    },
  }
</script>
<style scoped lang="scss">
  @import "../../styles/trackplaylist";
</style>

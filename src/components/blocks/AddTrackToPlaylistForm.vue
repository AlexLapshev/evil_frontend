<template>
  <div class="add-form__background" v-if="showAddTrackForm">
    <div class="add-track-to-playlist-form">
            <span
              class="close-btn"
              @click="closeForm"
            >
              X
            </span>
      <div
        :key="playlist.playlist_id"
        class="add-track-to-playlist-form__item"
        v-for="playlist in userPlaylists"
        @click="addTrackToPlaylist(playlist.playlist_id)"
      >
        {{playlist.playlist_name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddTrackToPlaylistForm",
    computed: {
      userPlaylists() {
        const playlists = this.$store.getters.userPlaylists
        let playlistsToShow = []
        for (let playlist of playlists) {
          if (!playlist.tracks.includes(this.$store.getters.trackToAddInPlaylist)) {
            playlistsToShow.push(playlist)
          }
        }
        return playlistsToShow
      },
      showAddTrackForm() {
        return this.$store.getters.addTrackToPlaylistForm
      }
    },
    methods: {
      addTrackToPlaylist(playlistId) {
        this.$store.dispatch('addTrackToPlaylist', {playlistId: playlistId, trackId: this.$store.getters.trackToAddInPlaylist, vm: this})
      },
      closeForm () {
        this.$store.dispatch('changeAddTrackToPlaylistForm')
      }
    },
  }
</script>

<style scoped lang="scss">
  .add-track-to-playlist-form {
    position: relative;
    top: 10%;

    &__item {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      padding: 10px 0 10px;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.06);
        transition: 800ms;
        color: #d6b3f6;
      }
    }
    .close-btn {
      right: 30px;
      font-size: 30px;
      &:hover {
        color: red;
        transition: 800ms;
        font-size: 40px;
      }
    }
  }
</style>

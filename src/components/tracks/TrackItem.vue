<template>
  <div :class="checkLiked(track.track_id) ? 'track-item liked' : 'track-item unliked'">
    <vs-row align="center">
      <vs-col w=2>
        <img
          v-if="release.release_cover"
          :src="require('@/assets/covers/releases/' + release.release_cover)"
          alt="Обложка"
          width="30px"
        >
        <img
          v-else
          :src="require('@/assets/covers/releases/null.png')"
          alt="Обложка"
          width="30px"
        >
      </vs-col>
      <vs-col w=5>
        <div class="track-item__info">
          <div class="track-item__info-name">
            {{track.track_name}}
          </div>
          <div class="track-item__info-artist">
            <router-link
              v-if="artist.artist_id"
              :to="{name: 'Artist', params: {id: artist.artist_id}}"
            >
              {{artist.artist_name }}
            </router-link>
          </div>
        </div>
      </vs-col>
      <vs-col w=4>
        <span class="track-item__field-release">
            <router-link
              v-if="release.release_id"
              :to="{name: 'Release', params: {id: release.release_id}}"
            >
              {{ release.release_name }}
            </router-link>
          </span>
      </vs-col>
      <div class="track-item__like-wrapper">
        <vs-col>
          <span
            @click="likeTrack(track.track_id)"
          >
            <span
              data-height="25px"
              class="iconify like-btn"
              data-icon="ant-design:heart-filled"
              data-inline="false">
            </span>
          </span>
          <span
            @click="addTrackToPlaylist(track.track_id)"
          >
            <span
              data-height="25px"
              class="iconify"
              data-icon="codicon:add"
              data-inline="false"
            >
            </span>
          </span>
          <span
            @click="removeTrackFromPlaylist">
            <span
              v-if="hideDelete"
              data-height="25px"
              class="iconify remove-btn"
              data-icon="maki:cross-11"
              data-inline="false">
            </span>
          </span>
        </vs-col>
      </div>
    </vs-row>
  </div>
</template>

<script>

  export default {
    name: "Track",
    props: ['trackId'],
    data() {
      return {
        userTrackIds: [],
        track: {},
        artist: {},
        release: {},
        route: [],
      }
    },
    mounted() {
      this.$axios.get(`/tracks/${this.trackId}`).then((response) => {
        this.track = response.data

      }).then(() => {
        this.$axios.get(`/artists/${this.track.artist_id}`).then((response) => {
          this.artist = response.data

        })
        this.$axios.get(`/stream/releases/${this.track.release_id}`).then((response) => {
          this.release = response.data

        })
      })
    },
    methods: {
      removeTrackFromPlaylist() {
        const accessToken = this.$store.getters.userAccessToken

        if (accessToken) {
          this.$store.dispatch('removeTrackFromPlaylist', {
            accessToken: accessToken,
            playlistId: this.$route.params.id,
            trackId: this.trackId,
            vm: this
          })
        }
      },
      checkLiked(trackId) {
        return this.userTracksIds.includes(trackId)
      },
      likeTrack(trackId) {
        this.$store.dispatch('likeTrack', {trackId: trackId, vm: this})
      },
      addTrackToPlaylist(trackId) {
        if (this.$store.getters.userPlaylists.length > 0) {
          this.$store.dispatch('changeAddTrackToPlaylistForm')
          this.$store.dispatch('changeTrackAddToPlaylist', {trackId: trackId})
        } else {
          this.$router.push('/playlists')
        }
      }
    },
    computed: {
      hideDelete() {
        const route = this.$route.path.split('/').filter(el => {
          return el !== ""
        })
        if (this.$store.getters.userPlaylists && route.length > 1) {
          const userPlaylistIds = this.$store.getters.userPlaylists.map(el => {
            return el.playlist_id
          })
          return route[0] === 'playlists' && userPlaylistIds.includes(Number(route[1]))
        }
      },
      userTracksIds() {
        return this.$store.getters.userTrackIds
      }
    }
  }
</script>
<style scoped lang="scss">
  .track-item {
    padding: 7px 14px;

    svg {
      cursor: pointer;
      margin-right: 10px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      transition: 800ms;
      color: #d6b3f6;
    }
  }

  .unliked {
    .track-item__like-wrapper {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.8s linear;
    }

    &:hover {
      .track-item__like-wrapper {
        visibility: visible;
        opacity: 1;
      }

      svg:hover {
        color: #8c3838;
      }
    }
  }

  .liked {
    .like-btn {
      color: #8c3838
    }

    svg {
      &:hover {
        color: #ffffff;
      }
    }
  }

</style>

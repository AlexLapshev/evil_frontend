<template>
  <div class="release-preview">
    <h3>{{release.release_name}}({{releaseYear}})</h3>
    <div
      class="release-preview__cover-wrapper"
      @click="likeRelease"
    >
      <img
        class="release-preview__cover"
        v-if="release.release_cover"
        :src="require('@/assets/covers/releases/' + release.release_cover)"
        alt="Обложка"
        width="200px"
      >
      <img
        class="release-preview__cover"
        v-else
        :src="require('@/assets/covers/releases/null.png')"
        alt="Обложка"
        width="200px"
      >
<!--      <div :class="checkLiked ? 'like-release liked' : 'like-release unliked'"></div>-->
      <div :class="checkLiked ? 'like-release liked' : 'like-release unliked'">
        <span
          class="iconify like-btn"
          data-icon="ant-design:heart-filled"
          data-inline="false"
          width="100px"
        >
        </span>
      </div>
    </div>
    <track-item
      v-for="track in release.tracks"
      :key="track.track_id"
      :track-id="track.track_id"
    >
    </track-item>
  </div>
</template>

<script>
  import TrackItem from "../tracks/TrackItem";


  export default {
    name: "ReleasePreview",
    components: {TrackItem},
    props: ['releaseId'],
    data() {
      return {
        release: {}
      }
    },
    computed: {
      releaseYear() {
        if (this.release.release_year) {
          return this.release.release_year.split('-')[0]
        }
      },
      checkLiked () {
        return this.$store.getters.userReleaseIds.includes(this.release.release_id)
      }
    },
    mounted() {
      if (this.releaseId) {
        this.getRelease()
      }
    },
    watch: {
      releaseId: function () {
        this.getRelease()
      }
    },
    methods: {
      getRelease() {
        this.$axios.get(`/stream/releases/${this.releaseId}`).then(response => {
          this.release = response.data
          this.$emit('gotRelease', this.release.artist_id)
        })
      },
      likeRelease () {
        this.$store.dispatch('likeRelease', {releaseId: this.releaseId, vm:this})
      }
    },

  }
</script>

<style scoped lang="scss">
  .release-preview {
    &__cover-wrapper {
      display: inline-block;
      position: relative;
      img {
        vertical-align: top;
      }
    }
    &__cover-wrapper:after {
      content: ' ';
      color: #fff;
      position: absolute;
      width: 100%; height:100%;
      top:0;
      left:0;
      background:rgba(0,0,0,0.6);
      opacity: 0;
      transition: all 1s;
      -webkit-transition: all 1s;
    }
    &__cover-wrapper:hover:after {
      /*cursor: pointer;*/
      opacity: 1;
    }
    &__cover-wrapper:hover {
      .like-release {
        opacity: 1;
        transition: all 1s;
        cursor: pointer;
      }
    }
    .like-release {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      opacity: 0;
    }
    .liked {
      .like-btn {
        color: #8c3838
      }
    }
  }
</style>

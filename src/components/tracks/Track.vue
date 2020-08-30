<template>

  <div class="track-field">
    <vs-row align="center">
      <vs-col w=3 v-if="1===1">
        <img v-if="release.release_cover" :src="require('../../../public/covers/releases/' + release.release_cover)"
             alt="Обложка" width="30px">
        <img v-else :src="require('../../../public/covers/releases/null.png')" alt="Обложка" width="30px">
      </vs-col>
      <vs-col w=3 v-else>
        <span class="iconify" data-icon="carbon:play-outline" width="30px" data-inline="false"></span>
      </vs-col>
      <vs-col w=6>
        <div class="track-field__info">
          <div class="track-field__name">
            {{track.track_name}}
          </div>
          <div class="track-field__artist">
            <router-link :to="{name: 'ArtistsReleases', params: {id: artist.id}}">{{ artist.artist_name }}
            </router-link>
          </div>
        </div>
      </vs-col>
      <vs-col w=3 class="track-field__remove-section">
        <div class="remove-section__wrapper">
          <span class="track-field__release">
            <router-link :to="{name: 'Release', params: {id: release.id}}">{{ release.release_name }}
            </router-link>
          </span>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import AxiosMixins from "../../../mixins/AxiosMixins";

  export default {
    name: "Track",
    props: ['trackId'],
    mixins: [
      AxiosMixins
    ],
    data() {
      return {
        track: {},
        artist: {},
        release: {},
      }
    },
    methods: {
      // getTrack: function (trackId) {
      //   return axios.get(process.env.VUE_APP_BASE_URL + '/tracks/' + trackId).then((response) => {
      //     this.track = response.data
      //   })
      // },
    },
    mounted() {
      this.getTrack(this.trackId).then((response) => {
        this.track = response.data
      }).then(()=>{
        this.getArtist(this.track.artist_id).then((response) => {
          this.artist = response.data
        })
        this.getRelease(this.track.release_id).then((response) => {
          this.release = response.data
        })
      })
    },
    computed: {}
  }
</script>
<style lang="scss">
  @import "../../styles/trackone";
</style>

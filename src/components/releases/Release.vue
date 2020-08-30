<template>
  <div class="release">
    <h3>{{release.release_name}}({{date}})</h3>
    <img v-if="release.release_cover" :src="require('../../../public/covers/releases/' + release.release_cover)"
         alt="Обложка" width="200px">
    <img v-else :src="require('../../../public/covers/releases/null.png')" alt="Обложка" width="200px">
    <div class="" v-for="track in release.tracks">
      <Track :track-id="track.id"></Track>
    </div>
  </div>
</template>

<script>
  import Track from "../tracks/Track"
  import AxiosMixins from "../../../mixins/AxiosMixins";

  export default {
    name: "ReleaseComp",
    components: {Track},
    props: ['releaseId'],
    data() {
      return {
        release: {},
        date: ''
      }
    },
    mixins: [
      AxiosMixins
    ],
    mounted() {
      this.getRelease(this.releaseId).then((response) => {
        this.release = response.data
        this.date = this.release.release_year.split('-')[0]
      })
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>

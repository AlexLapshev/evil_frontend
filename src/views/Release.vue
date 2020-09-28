<template>
  <div>
    <header-item
      :artist="artist"
    >
    </header-item>
    <release-preview
      :releaseId="releaseId"
    >
    </release-preview>
  </div>
</template>

<script>
  import ReleasePreview from "../components/releases/ReleasePreview";
  import HeaderItem from "../components/blocks/HeaderItem";

  export default {
    name: "Release",
    components: {
      HeaderItem,
      ReleasePreview
    },
    props: {},
    data() {
      return {
        artist: {},
        releaseId: ''
      }
    },
    mounted() {
      this.releaseId = this.$route.params.id
      this.$axios.get('/stream/releases/' + this.releaseId).then(response => {
        this.$axios.get('/artists/' + response.data.artist_id).then(response => {
          this.artist = response.data
        })
      })
    },
    methods: {
      // getArtist (artistId) {
      //   this.$axios(`/artists/${artistId}`).then(response=>{
      //     this.artist = response.data
      //   })
      // }
    }
  }
</script>

<style scoped>

</style>

<template>
  <release-list :releases="releases"></release-list>
</template>

<script>
  import ReleaseList from "../components/releases/ReleaseList"
  export default {
    name: "ReleasesPopular",
    components: {ReleaseList},
    data () {
      return {
        releases: []
      }
    },
    mounted() {
      this.$axios.get('stream/releases', {params:{q:16}}).then(response=>{
        this.releases = response.data
      })
    }
  }
</script>

<style scoped>

</style>

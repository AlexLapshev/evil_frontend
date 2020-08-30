<template>
  <ReleaseComp :releaseId="releaseId"></ReleaseComp>
</template>

<script>
  import ReleaseComp from "../components/releases/Release";

  export default {
    name: "Release",
    components: { ReleaseComp },
    data () {
      return {
        releaseId: this.$route.params.id
      }
    },
  }
</script>

<style scoped>

</style>

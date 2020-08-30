<template>
  <div class="main-releases">
    <div class="release-info" v-for="release in releases" :key="release.release_name">
      <Release :releaseId="release.id"></Release>
    </div>
  </div>
</template>

<script>
  import Release from "./Release";
  export default {
    name: 'ReleasesAll',
    props: ['releases'],
    components: {
      Release
    }
  }
</script>

<style scoped>

</style>

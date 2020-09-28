<template>
  <div v-if="loading" class="spinner-wrapper">
    <scale-loader
      :color="'purple'"
      :size="'50px'">
    </scale-loader>
  </div>
</template>

<script>
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

  export default {
    name: "LoadingSpinner",
    components: {
      ScaleLoader
    },
    computed: {
      loading () {
        return this.$store.getters.mainLoading
      }
    }
  }
</script>
<style scoped lang="scss">
  .spinner-wrapper {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 100000;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.78);
    overflow-x: hidden;
    .v-spinner {
      position: fixed;
      top: 50%;
      left: 50%;
    }
  }

</style>




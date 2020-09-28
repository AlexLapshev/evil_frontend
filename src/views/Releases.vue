<template>
  <div v-if="!$store.getters.userAccessToken">
    <h1>Популярные релизы</h1>
    <release-list :releases="popularReleases"></release-list>
  </div>
  <div v-else>
    <h1>Любимые релизы</h1>
    <release-list
      :releases="releases"
    >
    </release-list>
  </div>
</template>

<script>
  import MenuListItem from "../components/blocks/MenuListItem";
  import ReleaseList from "../components/releases/ReleaseList";

  export default {
    name: 'Releases',
    components: {
      ReleaseList,
      MenuListItem
    },
    data() {
      return {
        popularReleases: {}
      }
    },
    mounted() {
      if (!localStorage.getItem('access_token')) {
        this.$axios.get('stream/releases', {params: {q: 8}}).then((response) => {
          this.popularReleases = response.data
        })
      }
    },
    computed: {
      releases() {
        return this.$store.getters.userReleases
      }
    },
  }

</script>

<style scoped>

</style>

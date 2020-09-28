<template>
  <div>
    <h2>Популярные исполнители</h2>
    <artist-list
      :artists="artists"
    >
    </artist-list>
  </div>
</template>

<script>
  import MenuListItem from "../components/blocks/MenuListItem";
  import ArtistList from "../components/artists/ArtistList"

  export default {
    name: "ArtistsPopular",
    components: {MenuListItem, ArtistList},

    data() {
      return {
        artists: []
      }
    },
    mounted() {
      this.$axios.get('/artists', {params: {q: 16}}).then((response) => {
        this.artists = response.data
      })
    }
  }
</script>

<style scoped>

</style>

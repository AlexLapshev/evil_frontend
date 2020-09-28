<template>
  <div>
    <template v-if="!$store.getters.userAccessToken">
      <h1>Популярные исполнители</h1>
      <div class="menu-list">
        <menu-list-item
          class="menu-list__item"
          v-for="artist in popularArtists"
          :key="artist.artist_id"
          :id="artist.artist_id"
          :title="artist.artist_name"
          :cover="artist.artist_cover"
          :type="'artist'">
        </menu-list-item>
      </div>
    </template>
    <template v-else>
      <h1>Любимые исполнители</h1>
      <div class="menu-list">
        <menu-list-item
          class="menu-list__item"
          v-for="artist in artists"
          :key="artist.artist_id"
          :id="artist.artist_id"
          :title="artist.artist_name"
          :cover="artist.artist_cover"
          :type="'artist'">
        </menu-list-item>
      </div>
    </template>
  </div>
</template>

<script>
  import MenuListItem from "../components/blocks/MenuListItem";

  export default {
    name: "Artists",
    components: {
      MenuListItem
    },
    data() {
      return {
        popularArtists: {}
      }
    },
    mounted() {
      if (!localStorage.getItem('access_token')) {
        this.$axios.get('/artists', {params: {q: 16}}).then((response) => {
          this.popularArtists = response.data
          // this.$store.commit('SET_USER_ARTISTS', response.data)
        })
      }
    },
    computed: {
      artists() {
        return this.$store.getters.userArtists
      }
    },

  }
</script>

<style scoped>

</style>

<template>
  <div>
    <h1>Популярные плейлисты</h1>
    <div class="menu-list">
      <menu-list-item
        v-for="playlist in playlists"
        :key="playlist.playlist_id"
        class="menu-list__item"
        :id="playlist.playlist_id" :title="'#'+playlist.playlist_name"
        :cover="playlist.playlist_cover"
        :type="'playlist'"
      >
      </menu-list-item>
    </div>
  </div>
</template>

<script>
  import MenuListItem from "../components/blocks/MenuListItem";

  export default {
    name: "PlaylistsPopular",
    components: {
      MenuListItem
    },
    data() {
      return {
        playlists: []
      }
    },
    mounted() {
      this.$axios.get('/playlists', {
        params: {
          q: 16
        }
      }).then(response => {
        this.playlists = response.data
      })
    }
  }
</script>

<style scoped>

</style>

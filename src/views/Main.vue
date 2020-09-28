<template>
  <div class="container">
    <h2>Популярные исполнители</h2>
    <artist-list :artists="artists"></artist-list>
    <router-link class="more" to="/artists/popular">
      <vs-button relief>
        Ещё
      </vs-button>
    </router-link>
    <h2>Новые релизы</h2>
    <release-list :releases="releases"></release-list>
    <router-link
      class="more"
      to="/releases/popular"
    >
      <vs-button relief>
        Ещё
      </vs-button>
    </router-link>
    <h2>Популярные плейлисты</h2>
    <div class="menu-list">
      <div
        class="menu-list__item"
        v-for="playlist in playlists"
        :key="playlist.playlist_id"
      >
        <menu-list-item
          class="menu-list__item__info"
          :id="playlist.playlist_id"
          :title="playlist.playlist_name"
          :cover="playlist.playlist_cover"
          :type="'playlist'">
        </menu-list-item>
      </div>
    </div>
    <router-link class="more" to="/playlists/popular">
      <vs-button relief>
        Ещё
      </vs-button>
    </router-link>
  </div>
</template>

<script>
  import Header from "../components/blocks/HeaderItem";
  import MenuListItem from "../components/blocks/MenuListItem";
  import ArtistList from "../components/artists/ArtistList";
  import ReleaseList from "../components/releases/ReleaseList";

  export default {
    name: "Main",
    components: {
      ReleaseList,
      ArtistList,
      Header,
      MenuListItem
    },
    data() {
      return {
        artists: [],
        releases: [],
        playlists: [],
        search: ''
      }
    },
    mounted() {
      this.$axios('stream/releases/').then(response=>{
        this.releases = response.data
      })

      this.$axios('artists/').then(response => {
        this.artists = response.data
      })
      this.$axios('playlists/').then(response => {
        this.playlists = response.data
      })
    },
  }
</script>

<style scoped lang="scss">

</style>

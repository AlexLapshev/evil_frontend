<template>
  <div>
    <div v-if="!$store.getters.userAccessToken">
      <h1>Популярные плейлисты</h1>
      <div class="menu-list">
        <MenuListItem
          v-for="playlist in playlists"
          :key="playlist.playlist_id"
          class="menu-list__item"
          :id="playlist.playlist_id" :title="'#'+playlist.playlist_name"
          :cover="playlist.playlist_cover"
          :type="'playlist'">
        </MenuListItem>
      </div>
    </div>
    <div v-else>
      <div class="playlist-title__wrapper">
        <h1>Мои плейлисты</h1>

        <vs-button
          @click="showForm"
          class="add-btn"
        >
          Создать плейлист
        </vs-button>
      </div>
      <div class="menu-list">
        <menu-list-item
          v-for="playlist in userPlaylists"
          :key="playlist.playlist_id"
          class="menu-list__item"
          :id="playlist.playlist_id" :title="'#'+playlist.playlist_name"
          :cover="playlist.playlist_cover"
          :type="'playlist'"
          :deleteBtn="true"
        >
        </menu-list-item>
      </div>
      <add-playlist-form></add-playlist-form>

    </div>
  </div>
</template>

<script>
  import Playlist from "../components/playlists/Playlist";
  import MenuListItem from "../components/blocks/MenuListItem";
  import AddPlaylistForm from "../components/playlists/AddPlaylistForm";

  export default {
    name: 'Playlists',
    components: {
      Playlist,
      MenuListItem,
      AddPlaylistForm
    },
    data() {
      return {
        playlists: []
      }
    },
    computed: {
      userPlaylists() {
        return this.$store.getters.userPlaylists
      },
    },
    mounted() {
      if (!localStorage.getItem('access_token')) {
        this.$axios.get('playlists').then((response) => {
          this.playlists = response.data
        })
      }
    },
    methods: {
      showForm () {
        this.$store.dispatch('changeAddToPlaylistForm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .playlist-title__wrapper {
    display: flex;
    align-items: center;
    .add-btn {
      margin-left: 20px;
      height: 30px;
    }
  }
</style>

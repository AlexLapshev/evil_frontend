<template>
  <div class="main">
    <loading-spinner></loading-spinner>
    <search-input></search-input>
    <sidebar></sidebar>
    <router-view/>
    <add-track-to-playlist-form></add-track-to-playlist-form>
  </div>
</template>

<script>
  import Sidebar from "./components/Sidebar";
  import SearchInput from "./components/blocks/SearchInput";
  import LoadingSpinner from "./components/blocks/LoadingSpinner";
  import AddTrackToPlaylistForm from "./components/blocks/AddTrackToPlaylistForm";

  export default {
    components: {
      AddTrackToPlaylistForm,
      Sidebar,
      SearchInput,
      LoadingSpinner
    },
    mounted() {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        this.$store.dispatch('getUserInfo', this)
      }
    }
  }

</script>
<style>
  @import "styles/main.scss";
</style>

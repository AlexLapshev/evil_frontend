<template>
  <div class="user-info">
    Привет {{user_email}}
    <PlaylistsAll v-bind:playlists="playlists" ></PlaylistsAll>
  </div>
</template>

<script>
  import PlaylistsAll from "../playlists/PlaylistsAll";
  import AxiosMixins from "../../../mixins/AxiosMixins";
  import router from "../../router";

  export default {
    components: { PlaylistsAll},
    name: "UserProfile",
    mixins: [
      AxiosMixins
    ],
    mounted() {
      const access_token = localStorage.getItem("access_token")
      this.getUserPlaylists(access_token).then((response) => {
        this.playlists = response.data.playlists
        this.user_email = response.data.email
      }).catch((err)=>{
        router.push('/login')
      })
    },
    data() {
      return {
        playlists: [],
        user_email: ''
      }
    }
  }
</script>

<style scoped>

</style>

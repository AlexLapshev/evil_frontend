<template>
  <div class="user-profile">
    <h1>Привет {{username}}</h1>
    <h2>Любимые исполнители</h2>
    <div class="menu-list">
      <menu-list-item
        class="menu-list__item"
        v-for="artist in artists"
        :key="artist.artist_id"
        :id="artist.artist_id"
        :title="artist.artist_name"
        :cover="artist.artist_cover"
        :type="'artist'">
        >
      </menu-list-item>
    </div>
    <h2>Любимые треки</h2>
    <track-item
      v-for="track in tracks"
      :key="track.track_id"
      :track-id="track.track_id"
    >
    </track-item>
  </div>
</template>

<script>
  import TrackItem from "../components/tracks/TrackItem";
  import MenuListItem from "../components/blocks/MenuListItem";

  export default {
    name: "Profile",
    components: {
      MenuListItem,
      TrackItem,
    },

    mounted() {
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      }
    },
    computed: {
      username() {
        return this.$store.getters.userName
      },
      artists() {
        return this.$store.getters.userArtists
      },
      releases() {
        // return this.$store.getters.USER_RELEASES
      },
      tracks() {
        console.log('getting artists')

        return this.$store.getters.userTracks
      }
    }
  }
</script>

<style scoped>

</style>

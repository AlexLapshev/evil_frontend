<template>
  <div>
    <template v-if="!$store.getters.userAccessToken">
      <h1>Популярные треки</h1>
      <track-item
        v-for="track in popularTracks"
        :key="track.track_id"
        :track-id="track.track_id"
      >
      </track-item>
    </template>
    <template v-else>
      <h1>Любимые треки</h1>
      <track-item
        v-for="track in tracks"
        :key="track.track_id"
        :track-id="track.track_id"
      >
      </track-item>
    </template>
  </div>
</template>

<script>
  import TrackItem from "../components/tracks/TrackItem";

  export default {
    name: "Tracks",
    components: {TrackItem},
    data() {
      return {
        popularTracks: {}
      }
    },
    mounted() {
      if (!localStorage.getItem('access_token')) {
        this.$axios.get('tracks', {params: {q: 16}}).then((response) => {
          this.popularTracks = response.data
        })
      }
    },
    computed: {
      tracks() {
        return this.$store.getters.userTracks
      }
    },
  }
</script>

<style scoped>

</style>

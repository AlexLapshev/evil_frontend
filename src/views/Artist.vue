<template>
  <div class="container">
    <header-item
      :artist="artist"
    >
    </header-item>
    <h1>Популярные треки</h1>
    <track-item
      v-for="track in popularTracks"
      :key="track.track_id"
      :track-id="track.track_id"
    >
    </track-item>
    <h1>Релизы</h1>
    <div class="menu-list">
      <div class="menu-list__item" v-for="release in releases">
        <menu-list-item
          class="menu-list__item__info"
          :id="release.release_id"
          :title="release.release_name"
          :cover="release.release_cover"
          :type="'release'">
        </menu-list-item>
      </div>
    </div>
  </div>
</template>

<script>
  import ReleasePreview from "../components/releases/ReleasePreview";
  import MenuListItem from "../components/blocks/MenuListItem";
  import TrackItem from "../components/tracks/TrackItem";
  import HeaderItem from "../components/blocks/HeaderItem";

  export default {
    name: 'Artist',
    components: {
      HeaderItem,
      ReleasePreview,
      MenuListItem,
      TrackItem
    },
    data() {
      return {
        artist: {},
        releases: [],
        popularTracks: []
      }
    },
    mounted() {
      const artistId = this.$route.params.id
      this.$axios.get('/artists/' + artistId).then((response) => {
        this.artist = response.data
      })
      this.$axios.get(`/artists/${artistId}`).then((response) => {
        this.releases = response.data.releases


      }).catch(err => {
        console.log(err)
      })
      this.$axios.get(`/artists/${artistId}/tracks`).then(response => {
        this.popularTracks = response.data
        console.log(response.data)

      }).catch(err => {
        console.log(err)
      })
    },
  }
</script>
<style scoped lang="scss">
</style>

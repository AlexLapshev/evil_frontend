<template>
  <div class="main-info">
    <h1>
      {{artist_name}}
    </h1>
    <Releaseslist v-bind:releases="releases"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import Releaseslist from '../components/releases/ReleasesAll'

  export default {
    name: 'ArtistsReleases',
    props: ['id'],
    components: {
      Releaseslist
    },
    data() {
      return {
        releases: [],
        artist_name: ''
      }
    },
    mounted() {
      const artistId = this.$route.params.id
      this.artistId = artistId
      axios.get(process.env.VUE_APP_BASE_URL + '/artists/' + this.artistId + '/releases').then((response) => {
        this.releases = response.data
      })
      axios.get(process.env.VUE_APP_BASE_URL + '/artists/' + this.artistId).then((response) => {
        this.artist_name = response.data.artist_name
      })
    }
  }
</script>

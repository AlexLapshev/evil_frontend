<template>
  <div class="main">
    <h1>
      Плейлисты
    </h1>
    <PlaylistsAll v-bind:playlists="playlists"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import PlaylistsAll from '../components/playlists/PlaylistsAll'

  export default {
    name: 'Playlists',
    components: {
      PlaylistsAll
    },
    data () {
      return {
        playlists: []
      }
    },
    mounted () {
      axios.get(process.env.VUE_APP_BASE_URL + '/playlist/all').then((response) => {
        this.playlists = response.data
      })
    }
  }
</script>


<template>
  <div class="main">
    <h1>
      Исполнители
    </h1>
    <Artistslist
      v-bind:artists="artists"
    />
  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Artistslist from "../components/artists/ArtistsAll";

export default {
  name: 'Artists',
  components: {
    Artistslist
  },
  data () {
    return {
      artists: []
    }
  },
  mounted () {
    axios.get(process.env.VUE_APP_BASE_URL + '/artists').then((response) => {
      this.artists = response.data
    })
  }
}
</script>

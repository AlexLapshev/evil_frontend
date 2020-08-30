<template>
  <vs-row >
    <vs-col class="artist-release" v-for="artist in artists" :key="artist.artist_name" w="3">
      <router-link :to="{name: 'ArtistsReleases', params: {id: artist.id}}">
        <div class="artist-logo">
          <img :src="require('../../../public/covers/artists/' + artist.artist_cover)" alt="" width="250px" height="200px">
        </div>
        {{ artist.artist_name }}
      </router-link>
    </vs-col>
  </vs-row>
</template>

<script>
  export default {
    name: 'Artistslist',
    props: ['artists'],

  }

</script>

<style scoped lang="scss">
  @import "../../styles/artists";
</style>

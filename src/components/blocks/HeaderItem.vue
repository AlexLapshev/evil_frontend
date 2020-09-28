<template>
  <div class="header" v-if="artist.artist_id">
    <img :src="require('@/assets/covers/artists/' + artist.artist_cover)" alt="Обложка" width="300px">
    <div class="additional-info">
      <span>Исполнитель</span>
      <h2>{{artist.artist_name}}</h2>
      <vs-button
        @click="subscribeArtist(artist.artist_id)"
        v-if="checkArtist"
        color="rgb(174, 164, 176)"
        gradient
      >
        Отписаться
      </vs-button>
      <vs-button
        @click="subscribeArtist(artist.artist_id)"
        v-else
        color="rgb(170, 30, 201)"
        gradient
      >
        Подписаться
      </vs-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderItem",
    props: {
      artist: {}
    },
    computed: {
      checkArtist() {
        return this.$store.getters.userArtistIds.includes(this.artist.artist_id)
      }
    },
    methods: {
      subscribeArtist (artistId) {
        this.$store.dispatch('subscribeArtist', {artistId: artistId, vm: this})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);

    img {
      height: 220px;
      width: 220px;
      padding: 20px 0 20px 30px;
    }
    .additional-info {
      padding-left: 30px;

      h2 {
        font-size: 60px;
      }

      &__artist::after {
        content: " • ";
      }

      &__year::after {
        content: " • ";
      }
    }
  }
</style>

<template>
  <div class="menu-list">
    <div class="menu-list__item" v-for="artist in artists">
      <menu-list-item
        class="menu-list__item__info"
        :id="artist.artist_id" :title="artist.artist_name"
        :cover="artist.artist_cover"
        :type="'artist'">
      </menu-list-item>
    </div>
  </div>
</template>

<script>
  import MenuListItem from "../blocks/MenuListItem";
  export default {
    name: "ArtistList",
    components: {MenuListItem},
    props: {
      artists: {}
    },
  }
</script>

<style scoped>

</style>

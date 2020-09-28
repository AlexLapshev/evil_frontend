<template>
  <vs-row>
    <template v-if="playlist.tracks.length > 0">
      <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
        <router-link :to="{name: 'Playlist', params: {id: playlist.playlist_id}}">#{{ playlist.playlist_name }}</router-link>
      </vs-col>
      <span>{{ playlist.tracks.length }}</span>
    </template>
    <template v-else>
      <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
        <router-link :to="{name: 'Playlist', params: {id: playlist.playlist_id}}">#{{ playlist.playlist_name }}</router-link>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
        Нет треков
      </vs-col>
    </template>
  </vs-row>
</template>

<script>
  export default {
    name: "Playlist",
    props: ['playlist'],
  }
</script>

<style scoped>

</style>

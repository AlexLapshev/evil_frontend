<template>

  <div class="music">
    <vs-row class="title">
      <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
        Название плейлиста
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
        Количество треков
      </vs-col>
    </vs-row>
    <vs-row v-for="playlist in playlists">
      <template v-if="playlist.tracks.length > 0">
        <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
          <router-link :to="{name: 'Playlist', params: {id: playlist.id}}">#{{ playlist.playlist_name }}</router-link>
        </vs-col>
        <span>{{ playlist.tracks.length }}</span>
      </template>
      <template v-else>
        <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
          <router-link :to="{name: 'Playlist', params: {id: playlist.id}}">#{{ playlist.playlist_name }}</router-link>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="left" w="6">
          Нет треков
        </vs-col>
      </template>
    </vs-row>
  </div>
</template>

<script>
  export default {
    name: "PlaylistsAll",
    props: ['playlists'],
  }
</script>

<style scoped>

</style>

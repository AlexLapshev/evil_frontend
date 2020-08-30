     
<template>
  <div class="hidden">
    <vs-sidebar
      absolute
      hover-expand
      reduce
      open
    >
      <vs-sidebar-item id="artists">
        <template #icon>
          <img src="../assets/icons8-micro-90.png" alt="Артисты">
        </template>
        <router-link to="/artists">Артисты</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="releases">
        <template #icon>
          <img src="../assets/icons8-music-record-90.png" alt="Релизы">
        </template>
        <router-link to="/releases">Релизы</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="tracks">
        <template #icon>
          <img src="../assets/icons8-apple-music-90.png" alt="Треки">
        </template>
        <router-link to="/tracks">Треки</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="playlists">
        <template #icon>
          <img src="../assets/icons8-playlist-90.png" alt="Плейлисты">
        </template>
        <router-link to="/playlists">Плейлисты</router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="playlists">
        <template #icon>
          <img src="../assets/icons8-male-user-100.png" alt="Плейлисты">
        </template>
        <router-link to="/me">Профиль</router-link>
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style scoped>
  img {
    width: 20px
  }
</style>

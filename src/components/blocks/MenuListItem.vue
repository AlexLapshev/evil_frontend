<template>
    <router-link v-if="id" :to="typeUrl[type]+id" >
      <div class="menu-list__item-wrapper">
        <img v-if="cover" class="menu-list__item__info-img"
             :src="require('@/assets/covers' + typeUrl[type] + cover)" alt="">
        <div class="menu-list__item__info-title">{{title}}</div>
        <div
          v-if="deleteBtn"
          class="delete-btn"
          @click.prevent="deletePlaylist"
        >
          X
        </div>
      </div>
    </router-link>
</template>

<script>

  export default {
    name: "ListItem",
    components: {},
    props: {
      id: {},
      type: {
        default: 'artist'
      },
      cover: {},
      title: {
        default: 'Шлем'
      },
      deleteBtn: {
        default: false
      }
    },
    data() {
      return {
        typeUrl: {
          artist: '/artists/',
          playlist: '/playlists/',
          release: '/releases/'
        }
      }
    },
    methods: {
      deletePlaylist () {
        this.$store.dispatch('removeUserPlaylist', {playlistId:this.id, vm:this})
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/listitem";
</style>

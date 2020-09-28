<template>
  <div class="menu-list">
    <div class="menu-list__item" v-for="release in releases">
      <menu-list-item
        class="menu-list__item__info"
        :id="release.release_id"
        :title="release.release_name"
        :cover="release.release_cover"
        :type="'release'"
      >
      </menu-list-item>
    </div>
  </div>
</template>

<script>
  import MenuListItem from "../blocks/MenuListItem"

  export default {
    name: "ReleaseList",
    components: {MenuListItem},
    props: {
      releases: {}
    }
  }
</script>

<style scoped>

</style>

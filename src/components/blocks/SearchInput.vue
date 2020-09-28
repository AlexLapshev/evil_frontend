<template>
  <vs-input class="search-input"  v-model="search" placeholder="Исполнители, релизы">
    <template #icon>
      <span class="iconify" data-icon="ant-design:search-outlined" data-inline="false"></span>
    </template>
  </vs-input>
</template>

<script>
  export default {
    name: "SearchInput",
    data() {
      return {
        search: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .search-input {
    color: #000000;
    padding: 20px 0;
  }
</style>

<template>
  <div class="main">
    <Sidebar></Sidebar>
    <router-view/>
  </div>


</template>
<script>
  import Sidebar from "./components/Sidebar";

  export default {
    components: {Sidebar}
  }

</script>
<style>
  @import "styles/main.scss";
</style>

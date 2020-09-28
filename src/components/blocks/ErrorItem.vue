<template>
  <transition name="fade">
    <div
      class="error-item"
    >
      {{errorMessage}}
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ErrorItem",
    props: {
      errorMessage: ''
    }
  }
</script>

<style scoped lang="scss">
  .error-item {
    transition: 0.5s ease;
    color: red;
    background: white;
    display: inline-block;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid white;
    border-radius: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .9s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

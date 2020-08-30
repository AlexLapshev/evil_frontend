<template>
  <div v-if="getAccessToken" class="user-profile">
    <UserProfile></UserProfile>
  </div>
  <div v-else class="auth-user">
    <AuthForm></AuthForm>
  </div>
</template>

<script>
  import AuthForm from "../components/auth/AuthForm";
  import UserProfile from "../components/user/UserProfile";

  export default {
    name: "Profile",
    components: {AuthForm, UserProfile},

    computed: {
      getAccessToken: function () {
        return localStorage.getItem('access_token')
      }
    }
  }
</script>

<style scoped>

</style>

   
<template>
  <form class="login-form" @submit.prevent="login">
    <div class="login-inputs">
      <vs-input class="login-inputs__username" v-model="username" placeholder="User name">
        <template #icon>
          <span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span>
        </template>
      </vs-input>
      <vs-input class="login-inputs__password" type="password" v-model="password" placeholder="Password">
        <template #icon>
          <span class="iconify" data-icon="carbon:password" data-inline="false"></span>
        </template>
      </vs-input>
    </div>
    <vs-button
      type="submit"
    >
      Войти
    </vs-button>
  </form>

</template>


<script>
  import axios from 'axios'
  import router from "../../router";

  export default {
    name: "AuthForm",
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {

      login: function () {
        const qs = require('querystring')
        const requestBody = {
          username: this.username,
          password: this.password,
        }
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post(process.env.VUE_APP_BASE_URL + "/token", qs.stringify(requestBody), config)
          .then((response) => {
            localStorage.setItem('access_token', response.data.access_token)
          }).catch(err=>{

        })
          .then(() => {
          router.push('artists/').catch((err) => {
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/auth-form.scss";
</style>

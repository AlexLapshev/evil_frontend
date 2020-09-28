<template>
  <form
    class="login-form"
    @submit.prevent="login"
  >
    <div class="login-inputs">
      <vs-input
        class="login-inputs__username"
        v-model="username"
        placeholder="Имя пользователя"
      >
        <template #icon>
          <span
            class="iconify"
            data-icon="ant-design:user-outlined"
            data-inline="false"
          >
          </span>
        </template>
      </vs-input>
      <vs-input
        class="login-inputs__password"
        type="password"
        v-model="password"
        placeholder="Password"
      >
        <template #icon>
          <span
            class="iconify"
            data-icon="carbon:password"
            data-inline="false"
          >
          </span>
        </template>
      </vs-input>
    </div>
    <error-item
      v-if="error"
      :error-message="'Неправильный логин или пароль.'"
    >

    </error-item>
    <vs-button type="submit">Войти</vs-button>
  </form>
</template>

<script>
  import ErrorItem from "../blocks/ErrorItem";

  export default {
    name: "AuthForm",
    components: {ErrorItem},
    data() {
      return {
        username: '',
        password: '',
        error: false
      }
    },
    methods: {

      login() {
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
        this.$axios.post("/token", qs.stringify(requestBody), config)
          .then((response) => {
            console.log(response)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            this.$store.dispatch('getUserInfo', this)
            this.$store.dispatch('changeMainLoading')
            this.$router.push('/artists')
            setTimeout(() => {
              this.$store.dispatch('changeMainLoading')
            }, 2000)
          }).catch(err => {
          this.password = ''
          this.username = ''
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 2000)
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  .login-inputs {
    align-items: center;
    color: #000;

    .vs-input__icon {
    }

    &__password, &__username {
      padding-bottom: 15px;
    }
  }


</style>

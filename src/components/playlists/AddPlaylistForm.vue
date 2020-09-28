<template>
  <div class="add-form__background" v-if="showForm">
    <div class="add-form__wrapper">
      <span
        class="close-btn"
        @click="closeForm"
      >
        X</span>
      <h1>Новый плейлист</h1>
      <form @submit.prevent="createPlaylist">
        <vs-input
          name="playlist_name"
          ref="playlistName"
          class="name-input"
          color="rgb(59,222,200)"
          v-model="playlistName"
          placeholder="Название">
        </vs-input>
        <vs-checkbox
          name="playlist_public"
          v-model="playlistPublic"
          class="public-checkbox"
          ref="playlistPublic"

        >
          Публичный
        </vs-checkbox>
        <input
          @change="onFileChange"
          type="file"
          name="playlist_cover"
          ref="playlistCover"
        >
        <div
          v-if="imageName"
          class="remove-image__wrapper"
        >
          <div
            class="image-name">{{imageName}}
          </div>
          <span
            @click="resetImage">
            <span
              data-height="25px"
              class="iconify remove-btn"
              data-icon="maki:cross-11"
              data-inline="false">
            </span>
          </span>
        </div>
        <vs-button
          class="add-btn"
          type="submit"
        >
          Создать плейлист
        </vs-button>
        <div
          class="error-message"
          v-if="errorMessage"
        >
          {{errorMessage}}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddPlaylistForm",
    data() {
      return {
        playlistName: '',
        playlistPublic: true,
        playlistCover: null,
        imageName: '',
        errorMessage: null,
      }
    },
    methods: {
      onFileChange(event) {
        if (event.target.files[0]) {
          this.playlistCover = event.target.files[0]
        }
        this.imageName = event.target.files[0].name
      },
      resetImage() {
        this.playlistCover = null
        this.imageName = ''
        this.playlistName = null
        this.$refs.playlistCover.value = ''
      },
      errorHandling(message) {
        this.errorMessage = message
        this.playlistName = null

        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
      },
      createPlaylist() {
        if (this.playlistName.length > 20) {
          this.errorHandling('Название слишком длинное')
          return
        }

        let formData = new FormData();
        formData.append('playlist_name', this.playlistName)
        formData.append('playlist_public', this.playlistPublic)
        if (this.playlistCover) {
          if (Number(this.playlistCover.size) / 1048576 < 1) {
            formData.append('playlist_cover', this.playlistCover)
          } else {
            this.errorHandling('Размер изображение слишком большой')
            this.resetImage()
            return;
          }
        }
        this.$axios.post('/users/playlists',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
          }).then(response => {
          console.log('closing form')
          this.closeForm()
          this.$store.dispatch('changeMainLoading')
          setTimeout(() => {
            this.$store.dispatch('getUserInfo', this)
            this.$store.dispatch('changeMainLoading')
          }, 2000)
        })
      },
      closeForm() {
        this.resetImage()
        this.$store.dispatch('changeAddToPlaylistForm')
      }
    },
    computed: {
      showForm() {
        return this.$store.getters.addPlaylistForm
      }
    }
  }
</script>

<style scoped lang="scss">


  .add-form__wrapper {
    z-index: 50001;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;

    .name-input {
      color: #000;
    }

    .remove-image__wrapper {
      display: flex;
      align-items: center;
    }

    .remove-btn {
      position: relative;
      margin-left: 4px;
      cursor: pointer;
      top: 4px;
    }

    .public-checkbox {
      margin: 10px 0 10px 0;
    }

    .add-btn {
      margin-top: 10px;
    }

  }
</style>

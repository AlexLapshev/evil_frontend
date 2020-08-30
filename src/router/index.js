import Vue from 'vue'
import VueRouter from 'vue-router'
import Artists from '../views/Artists.vue'
import ArtistsReleases from '../views/ArtistsReleases.vue'
import Playlist from '../views/Playlist'
import Playlists from '../views/Playlists'
import Profile from "../views/Profile";
import Login from "../views/Login";
import Release from "../views/Release";
import Releases from "../views/Releases";


Vue.use(VueRouter)

const routes = [
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/artists/:id/releases',
    name: 'ArtistsReleases',
    component: ArtistsReleases
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/releases',
    name: 'Releases',
    component: Releases
  },
  {
    path: '/release/:id',
    name: 'Release',
    component: Release
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

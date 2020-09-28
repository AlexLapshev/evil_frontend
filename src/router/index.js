import Vue from 'vue'
import VueRouter from 'vue-router'

import Artist from '../views/Artist.vue'
import Artists from "../views/Artists";
import ArtistsPopular from "../views/ArtistsPopular"

import Playlist from '../views/Playlist'
import Playlists from '../views/Playlists'
import PlaylistsPopular from "../views/PlaylistsPopular";

import Profile from "../views/Profile";
import Login from "../views/Login";

import Release from "../views/Release";
import Releases from "../views/Releases";
import ReleasesPopular from "../views/ReleasesPopular"

import Tracks from "../views/Tracks"

import Main from "../views/Main";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/artists/popular',
    name: 'ArtistsPopular',
    component: ArtistsPopular
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/artists/:id/',
    name: 'Artist',
    component: Artist
  },
  {
    path: '/playlists/popular',
    name: 'PlaylistsPopular',
    component: PlaylistsPopular,
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/playlists/:id',
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
    path: '/releases/popular',
    name: 'ReleasesPopular',
    component: ReleasesPopular,
  },
  {
    path: '/releases/:id',
    name: 'Release',
    component: Release,
  },
  {
    path: '/releases/',
    name: 'Releases',
    component: Releases
  },
  {
    path: '/tracks/',
    name: 'Tracks',
    component: Tracks
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

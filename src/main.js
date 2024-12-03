import './assets/global.css'
import './assets/dark-mode.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { CohereClient } from "cohere-ai";
import App from './App.vue'
import store from "./store/store";
import router from "./router";
//import vuetify from "./plugins/vuetify.js";

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'; 

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
}); 

createApp(App)
.use(router).use(createPinia()).use(vuetify).use(store).mount('#app').provide('cohereClient', new CohereClient({ token: process.env.VITE_APP_COHERE_API_KEY }));
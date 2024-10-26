import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from "./store/store";
import router from "./router";
import vuetify from "./plugins/vuetify.js";

createApp(App).use(router).use(createPinia()).use(vuetify).use(store).mount('#app');
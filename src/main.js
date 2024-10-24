import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router.js";
import store from "./store/store";
import vuetify from "./plugins/vuetify.js";

createApp(App).use(router).use(createPinia()).use(vuetify).use(store).mount('#app');
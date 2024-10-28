import './assets/global.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import store from "./store/store";
import router from "./router";
import vuetify from "./plugins/vuetify.js";
import VueSidebarMenu from 'vue-sidebar-menu'

createApp(App).use(router).use(createPinia()).use(vuetify).use(VueSidebarMenu).use(store).mount('#app');
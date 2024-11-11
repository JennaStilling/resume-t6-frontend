import './assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { CohereClient } from "cohere-ai";
import App from './App.vue'
import store from "./store/store";
import router from "./router";
import vuetify from "./plugins/vuetify.js";

createApp(App)
.provide('cohereClient', new CohereClient({ token: "IzGMIHeC1TA9JpqCxW9WCLWLngwPw44fwwcO7Hfr" }))
.use(router).use(createPinia()).use(vuetify).use(store).mount('#app');
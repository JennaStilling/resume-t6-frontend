import './assets/global.css'; 
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Create Vue application
const app = createApp(App);

// Use Pinia for state management
app.use(createPinia());

// Integrate Vue Router properly and mount the application
app.use(router).mount('#app');




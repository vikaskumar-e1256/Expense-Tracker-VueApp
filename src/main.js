import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(Toast);
app.mount('#app');

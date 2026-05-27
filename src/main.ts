import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import '@/assets/styles/variables.css'
import '@/assets/styles/base.css'

const app = createApp(App)
app.mount('#app')

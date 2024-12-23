import './assets/main.css'
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import AnimateOnScroll from 'primevue/animateonscroll'
import router from "@/routes"
import { createApp } from 'vue'
import ToastService from 'primevue/toastservice'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.directive('animateonscroll', AnimateOnScroll)
app.use(ToastService)
app.use(router)

app.mount('#app')
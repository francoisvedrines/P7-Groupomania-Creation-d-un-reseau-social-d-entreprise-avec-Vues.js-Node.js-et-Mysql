//importation styles css
import '@/assets/custom-style.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'


//importation du router
import  router  from '@/router/router.js'


import { createApp } from 'vue'


import App from './App.vue'

//montage du store vuex et du router et montage de vue dans la div #app
createApp(App).use(router).use(store).mount('#app')



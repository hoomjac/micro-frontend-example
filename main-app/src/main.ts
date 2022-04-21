import { createApp } from 'vue'
import { registerGlobalComponent } from './utils/registerGlobalComp'
import App from './App.vue'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const app = createApp(App)

registerGlobalComponent(app).mount('#app')

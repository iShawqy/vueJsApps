import {createApp} from 'vue';
import App from  './App';
import Toaster from "@meforma/vue-toaster";


const app = createApp(App);
app.use(Toaster)

app.mount('#app')
import 'vue3-toastify/dist/index.css';
import '@/assets/styles/index.scss';

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import { create, NText } from 'naive-ui/es';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

const naive = create({
  components: [NText],
});

import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(naive);
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000,
} as ToastContainerOptions);

app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'unfonts.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light',
    themes: {
      light: {
        colors: {
          primary: '#2196F3',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
        },
      },
    },
  },
})

createApp(App)
  .use(vuetify)
  .mount('#app')

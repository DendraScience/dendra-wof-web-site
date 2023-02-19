// Styles
// import 'vuetify/lib/styles/main.sass'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify/lib/framework'
import * as directives from 'vuetify/lib/directives/index.mjs'
// SEE: https://pictogrammers.github.io/@mdi/font/7.0.96/
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
  directives,

  icons: {
    defaults: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },

  theme: {
    themes: {
      dark: {
        dark: true
      },

      light: {
        dark: false
      }
    }
  }
})

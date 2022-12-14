import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue,
      },
      dark: {
        primary: colors.blue,
      },
    },
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  },
});

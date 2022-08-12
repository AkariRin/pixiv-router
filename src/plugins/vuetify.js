import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const mq = window.matchMedia("(prefers-color-scheme: dark)");

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
    dark: mq.matches,
  },
});

mq.addEventListener("change", (e) => {
  Vuetify.framework.theme.dark = e.matches;
});

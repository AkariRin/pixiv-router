const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
    },
    manifestOptions: {
      categories: ["tools"],
    },
  },
});

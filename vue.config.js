const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    themeColor: "#00BFFF",
    msTileColor: "#00BFFF",
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
    },
    manifestOptions: {
      categories: ["tools"],
      background_color: "#00BFFF",
      icons: [
        {
          src: "img/icons/android-chrome-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
      ],
    },
  },
});

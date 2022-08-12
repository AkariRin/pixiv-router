<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Pixiv导航</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            dark
            href="https://github.com/AkariRin/route2pixiv"
            target="_blank"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>在GitHub查看源代码</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="10" offset="1">
            <v-switch v-model="blank">
              <template v-slot:label>在新标签页打开</template>
            </v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              v-model="pid"
              label="作品pid"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-btn
              :href="pidLink"
              :target="target"
              :disabled="pidDisable"
              color="primary"
              block
            >
              <v-icon left>mdi-link-variant</v-icon>
              前往作品页面
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field
              v-model="illustratorId"
              label="画师id"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-btn
              :href="illustratorLink"
              :target="target"
              :disabled="illustratorDisable"
              color="primary"
              block
            >
              <v-icon left>mdi-link-variant</v-icon>
              前往画师主页
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-text-field v-model="tag" label="tag" clearable></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-btn
              :href="tagLink"
              :target="target"
              :disabled="tagDisable"
              color="primary"
              block
            >
              <v-icon left>mdi-tag</v-icon>
              前往tag页面
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10" offset="1">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>说明</v-expansion-panel-header>
                <v-expansion-panel-content>
                  当你在贴吧冲浪的时候发现有8u发涩图，同时有中国式英雄留下了一串神秘数字。
                  但是在看到好东西之前还要在浏览器中输入一大串网址，十分的麻烦。
                  这个小工具可以在填入pid或画师id后直接导航到对应的p站页面
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-col cols="12" class="text-center"><strong>route2pixiv</strong></v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    pid: "",
    illustratorId: "",
    tag: "",
    blank: false,
  }),
  computed: {
    pidLink() {
      return `https://pixiv.net/artworks/${this.pid}`;
    },
    illustratorLink() {
      return `https://pixiv.net/users/${this.illustratorId}`;
    },
    tagLink() {
      return `https://www.pixiv.net/tags/${this.tag}/artworks`;
    },
    pidDisable() {
      return this.pid === "";
    },
    illustratorDisable() {
      return this.illustratorId === "";
    },
    tagDisable() {
      return this.tag === "";
    },
    target() {
      return this.blank ? "_blank" : "";
    },
  },
};
</script>

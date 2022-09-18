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
      <v-container>
        <v-row dense>
          <v-col cols="12" md="10" offset-md="1">
            <v-switch v-model="blank">
              <template v-slot:label>在新标签页打开</template>
            </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="10" offset-md="1">
            <v-switch v-model="enableHistory">
              <template v-slot:label>历史记录</template>
            </v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field
              v-model="pid"
              label="作品pid"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
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
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field
              v-model="illustratorId"
              label="画师id"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
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
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field v-model="tag" label="tag" clearable></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
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
          <v-col cols="12" md="10" offset-md="1">
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
        <v-row>
          <v-col cols="12" md="10" offset-md="1">
            <v-data-table
              no-data-text="暂无历史记录"
              disable-filtering
              disable-sort
              disable-pagination
              hide-default-footer
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <v-col cols="12" class="text-center"><strong>Pixiv Router</strong></v-col>
    </v-footer>
  </v-app>
</template>

<script>
import dataHandler from "@/dataHandler";

export default {
  name: "App",
  data: () => ({
    pid: "",
    illustratorId: "",
    tag: "",
    blank: dataHandler.readCfgBlank(),
    enableHistory: dataHandler.readCfgEnable(),
    history: dataHandler.readHistory(),
    headers: [
      { text: "类型", value: "type" },
      { text: "ID/TAG", value: "value" },
      { text: "操作", value: "action" },
    ],
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
  methods: {
    log() {},
    del() {},
    delAll() {
      this.history = [];
    },
  },
  created() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        this.$vuetify.theme.dark = e.matches;
      });
  },
  watch: {
    blank: function (val) {
      dataHandler.writeCfgBlank(val);
    },
    enableHistory: function (val) {
      dataHandler.writeCfgEnable(val);
    },
    history: {
      handler(val) {
        dataHandler.writeHistory(val);
      },
      deep: true,
    },
  },
};
</script>

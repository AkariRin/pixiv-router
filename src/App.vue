<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Pixiv导航</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-github"
            href="https://github.com/AkariRin/pixiv-router"
            target="_blank"
            v-bind="props"
          ></v-btn>
        </template>
        <span>在GitHub查看源代码</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row dense>
          <v-col cols="12" md="10" offset-md="1">
            <v-switch v-model="blank" label="在新标签页打开"></v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="10" offset-md="1">
            <v-switch v-model="enableHistory" label="历史记录"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field
              v-model="pid"
              label="作品pid"
              clearable
              variant="underlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              :href="getLinkByType('pid', pid)"
              :target="target"
              :disabled="pid === ''"
              @click="log('pid', pid)"
              color="primary"
              block
            >
              <v-icon start>mdi-link-variant</v-icon>
              前往作品页面
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field
              v-model="illustratorId"
              label="画师id"
              variant="underlined"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              :href="getLinkByType('画师id', illustratorId)"
              :target="target"
              :disabled="this.illustratorId === ''"
              @click="log('画师id', illustratorId)"
              color="primary"
              block
            >
              <v-icon start>mdi-account</v-icon>
              前往画师主页
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" offset-md="1">
            <v-text-field v-model="tag" label="tag" clearable variant="underlined"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
              :href="getLinkByType('tag', tag)"
              :target="target"
              :disabled="this.tag === ''"
              @click="log('tag', tag)"
              color="primary"
              block
            >
              <v-icon start>mdi-tag</v-icon>
              前往tag页面
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="enableHistory">
          <v-col cols="12" md="10" offset-md="1">
            <v-data-table
              :headers="headers"
              :items="history"
              no-data-text="暂无历史记录"
              mobile-breakpoint="0"
              hide-default-footer
              class="elevation-1"
            >
              <template #top>
                <v-toolbar>
                  <v-toolbar-title>历史记录</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="deleteDialog" max-width="400px">
                    <template #activator="{ props }">
                      <v-btn color="red" v-bind="props">
                        清空记录
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        你确定要清空历史记录吗？
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue-darken-1"
                          @click="deleteDialog = false"
                          >取消</v-btn
                        >
                        <v-btn color="red-darken-1" @click="delAll"
                          >清空</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template #[`item.type`]="{ item }">
                <v-chip :color="getColor(item.type)">
                  {{ item.type }}
                </v-chip>
              </template>
              <template #[`item.action`]="{ item }">
                <v-btn
                  :href="getLinkByType(item.type, item.value)"
                  :target="target"
                  icon="mdi-open-in-new"
                ></v-btn>
                <v-btn @click="del(item)" icon="mdi-delete"></v-btn>
              </template>
            </v-data-table>
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
import _ from "lodash";
import { useTheme } from 'vuetify';

export default {
  name: "App",
  data: () => ({
    pid: "",
    illustratorId: "",
    tag: "",
    blank: localStorage.getItem("blank") === null ? false : localStorage.getItem("blank") === "1",
    enableHistory: localStorage.getItem("enable") === null ? false : localStorage.getItem("enable") === "1",
    history: localStorage.getItem("history") === null ? [] : JSON.parse(localStorage.getItem("history")),
    headers: [
      { title: "类型", key: "type" },
      { title: "id/tag", key: "value" },
      { title: "操作", key: "action" },
    ],
    deleteDialog: false,
  }),
  computed: {
    target() {
      return this.blank ? "_blank" : "";
    },
  },
  methods: {
    log(type, val) {
      if (!this.enableHistory) return;
      if (_.size(this.history) === 10) this.history.pop();
      let item = { type: type, value: val };
      this.history.unshift(item);
    },
    getLinkByType(type, content) {
      return type === "pid"
        ? `https://pixiv.net/artworks/${content}`
        : type === "画师id"
        ? `https://pixiv.net/users/${content}`
        : type === "tag"
        ? `https://www.pixiv.net/tags/${content}/artworks`
        : "https://www.pixiv.net/";
    },
    del(item) {
      this.history.splice(this.history.indexOf(item), 1);
    },
    delAll() {
      this.history = [];
      this.deleteDialog = false;
    },
    getColor(type) {
      return type === "pid" ? "primary" : type === "画师id" ? "red" : "purple";
    },
  },
  setup() {
    const theme = useTheme();

    // 设置初始主题
    theme.global.name.value = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';

    // 监听系统主题变化
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        theme.global.name.value = e.matches ? 'dark' : 'light';
      });
  },
  watch: {
    blank: function (val) {
      let data = val ? "1" : "0";
      localStorage.setItem("blank", data);
    },
    enableHistory: function (val) {
      let data = val ? "1" : "0";
      localStorage.setItem("enable", data);
    },
    history: {
      handler(val) {
        localStorage.setItem("history", JSON.stringify(val));
      },
      deep: true,
    },
  },
};
</script>

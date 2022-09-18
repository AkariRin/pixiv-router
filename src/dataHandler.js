export default {
  readHistory: function () {
    return localStorage.getItem("history") === null
      ? []
      : JSON.parse(localStorage.getItem("history"));
  },
  writeHistory: function (val) {
    localStorage.setItem("history", JSON.stringify(val));
  },
  readCfgBlank: function () {
    return localStorage.getItem("blank") === null
      ? false
      : localStorage.getItem("blank") === "1";
  },
  writeCfgBlank: function (val) {
    let data = val ? "1" : "0";
    localStorage.setItem("blank", data);
  },
  readCfgEnable: function () {
    return localStorage.getItem("enable") === null
      ? false
      : localStorage.getItem("enable") === "1";
  },
  writeCfgEnable: function (val) {
    let data = val ? "1" : "0";
    localStorage.setItem("enable", data);
  },
};

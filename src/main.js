import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Loading, Dialog, Notify } from "quasar";
import App from "./App";

/** plugins */
import jquery from "@/plugins/jquery";
import VueLazyLoad from "vue3-lazyload";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import VueApexCharts from "vue3-apexcharts";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
/** _app */
import layouts from "@/_app/layouts";
import components from "@/_app/components";
import providers from "@/_app/providers";
import directives from "@/_app/directives";
/** other */
import "./assets/main.scss";
import "@fortawesome/fontawesome-free/js/all";

const app = createApp(App);
const pinia = createPinia();
app.provide("$jQuery", jquery);
// 註冊函數 用於多分頁
app.provide("registerComponent", (name, component) => {
  console.log("registerComponentName:", name);
  app.component(name, component);
});
app.use(pinia);
app.use(layouts);
app.use(directives);
app.use(components);
app.use(VueLazyLoad, {
  loading: "",
  error: "",
});
app.use(Quasar, {
  plugins: {
    Loading,
    Dialog,
    Notify,
  },
});
app.use(VueApexCharts);

// /** mock server用 */
// if (import.meta.env.PROD) {
//   import("../mockProdServer").then(({ setupProdMockServer }) => {
//     setupProdMockServer();
//   });
// }

// app.use(drag);

/** services register / 自定義hook */
app.use(providers);

app.mount("#app");

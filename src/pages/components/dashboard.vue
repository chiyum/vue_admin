<template>
  <div class="dashboard">
    <div class="dashboard-main">
      <div class="dashboard-main-top">
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.1") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.1")
            }}</span>
          </q-card-section>
          <q-card-section>
            <Line :data="state.line.data" :options="state.line.options" />
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.2") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.2")
            }}</span>
          </q-card-section>
          <q-card-section>
            <Bar :data="state.bar.data" :options="state.bar.options" />
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.3") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.3")
            }}</span>
          </q-card-section>
          <q-card-section>
            <Doughnut
              :data="state.doughnut.data"
              :options="state.doughnut.options"
            />
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.4") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.4")
            }}</span>
          </q-card-section>
          <q-card-section>
            <Pie :data="state.pic.data" :options="state.pic.options" />
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.5") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.5")
            }}</span>
          </q-card-section>
          <q-card-section>
            <PolarArea
              :data="state.polar.data"
              :options="state.polar.options"
            />
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card">
          <q-card-section>
            <h3>{{ t("pages.dashboard.chart.title.6") }}</h3>
            <span class="global-tip">{{
              t("pages.dashboard.chart.tip.6")
            }}</span>
          </q-card-section>
          <q-card-section>
            <Radar :data="state.radar.data" :options="state.radar.options" />
          </q-card-section>
        </q-card>
      </div>
      <ul class="dashboard-main-middle"></ul>
      <div class="dashboard-main-bottom"></div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "@/services/i18n-service";
import { defineOptions } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Line, Bar, Doughnut, Pie, PolarArea, Radar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler
);

defineOptions({
  // layout: "layout-default", // 對應的layout 預設layout-default
  // isHideSidebar: true, // 是否在slidebar隱藏 預設false
  sidebarSort: 1, // sidebar排序 預設自動排序 從1開始
  sidebarIcon: "dashboard", // sidebar icon 若無則也有預設值
  /** 自定義傳參數選項 */
  customOptions: {
    something: "hello world",
  },
});

const state = reactive({
  line: {
    data: {
      labels: ["February", "March", "April", "May", "June", "July", "August"],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
  bar: {
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
  doughnut: {
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
  pic: {
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
  polar: {
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "My First Dataset",
          data: [11, 16, 7, 3, 14, 5],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
          ],
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
  radar: {
    data: {
      labels: ["Running", "Swimming", "Eating", "Cycling", "Sleeping"], // 定義每個數據點的標籤
      datasets: [
        {
          label: "Person A", // 第一個數據集的標籤
          data: [65, 59, 90, 81, 56], // 對應每個標籤的數值
          backgroundColor: "rgba(255, 99, 132, 0.2)", // 數據集的背景顏色
          borderColor: "rgba(255, 99, 132, 1)", // 數據集的邊框顏色
          borderWidth: 1, // 邊框寬度
        },
        {
          label: "Person B", // 第二個數據集的標籤
          data: [28, 48, 40, 19, 96], // 第二個數據集的數值
          backgroundColor: "rgba(54, 162, 235, 0.2)", // 第二個數據集的背景顏色
          borderColor: "rgba(54, 162, 235, 1)", // 第二個數據集的邊框顏色
          borderWidth: 1, // 邊框寬度
        },
      ],
    },
    options: {
      responsive: true, // 是否自適應寬高
      maintainAspectRatio: false, // 是否保持比例
    },
  },
});

const { t } = useI18n();
</script>

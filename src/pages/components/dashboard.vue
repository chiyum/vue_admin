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
import { allDashboard } from "@/constants/dashboard.js";
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

const state = reactive(allDashboard);

const { t } = useI18n();
</script>

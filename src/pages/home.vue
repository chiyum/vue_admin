<template>
  <div class="home">
    <div class="home-top">
      <data-card
        label="Total Revenue"
        text="$ 1,000,000"
        icon="attach_money"
        btnText="View Details"
        :callback="
          () => {
            console.log('click');
          }
        "
      />
      <data-card
        label="Total Revenue"
        text="$ 1,000,000"
        icon="attach_money"
        btnText="View Details"
        :callback="
          () => {
            console.log('click');
          }
        "
      />
      <data-card
        label="Total Revenue"
        text="$ 1,000,000"
        icon="attach_money"
        btnText="View Details"
        :callback="
          () => {
            console.log('click');
          }
        "
      />
    </div>
    <div class="home-middle">
      <q-card>
        <q-card-section>
          <Line
            class="rwd-canvas"
            :data="line2.data"
            :options="line2.options"
          />
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <Doughnut
            class="rwd-canvas"
            :data="doughnut2.data"
            :options="doughnut2.options"
          />
        </q-card-section>
      </q-card>
    </div>
    <div class="home-bottom">
      <q-card>
        <q-card-section>
          <q-table
            class="home-table"
            flat
            bordered
            title="Treats"
            :rows="rows"
            :columns="columns"
            row-key="name"
          />
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section class="w-full h-full">
          <Bar
            class="rwd-width-canvas"
            :data="bar2.data"
            :options="bar2.options"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import dataCard from "@/widgets/ui/data-card.vue";
import { defineOptions } from "vue";
import { line2, doughnut2, bar2 } from "@/constants/dashboard.js";
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
import { Line, Doughnut, Bar } from "vue-chartjs";

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
  // isHideSidebar: true, // 是否在sidebar隱藏 預設false
  sidebarSort: 1, // sidebar排序 預設自動排序 從1開始
  sidebarIcon: "dashboard", // sidebar icon 若無則也有預設值
  /** 自定義傳參數選項 */
  customOptions: {
    something: "hello world",
  },
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];
</script>
<style lang="scss">
@import "@/assets/scss/home.scss";
</style>

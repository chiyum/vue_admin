<template>
  <q-tabs
    ref="tabsRef"
    class="draggable-tabs"
    :class="{ 'is-dragging': draggingIndex !== null }"
    v-model="model"
    v-bind="otherBind"
  >
    <q-tab
      v-for="(tab, index) in tabs"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
      class="draggable-tab"
      :class="{
        'is-dragging': draggingIndex === index,
        'insert-before': shouldShowInsertBefore(index),
        'insert-after': shouldShowInsertAfter(index),
      }"
      :style="getTabStyle(index)"
      @mousedown.prevent="startDrag($event, index)"
      @touchstart.prevent="startDrag($event, index)"
    />
  </q-tabs>
</template>

<script setup>
import { defineModel } from "vue";
// 定義組件的 props
const props = defineProps({
  initialTabs: {
    type: Array,
    required: true,
  },
  otherBind: {
    type: Object,
    default: () => ({}),
  },
});

const model = defineModel();

// 使用 ref 創建響應式數據
const tabs = ref([...props.initialTabs]); // 複製初始標籤列表
const draggingIndex = ref(null); // 當前正在拖拽的標籤索引
const dragOffset = ref(0); // 拖拽的水平偏移量
const tabsRef = ref(null); // q-tabs 元素的引用
const potentialIndex = ref(null); // 拖拽過程中的潛在新位置

// 用於跟踪拖拽狀態的變量
let startX = 0; // 開始拖拽時的 X 坐標
let startY = 0; // 開始拖拽時的 Y 坐標
let startTime = 0; // 開始拖拽的時間戳
let startIndex = 0; // 開始拖拽的標籤索引
let draggedElement = null; // 當前被拖拽的 DOM 元素

// 常量定義
const CLICK_TIME_THRESHOLD = 200; // 判斷為點擊的最大時間閾值（毫秒）
const CLICK_DISTANCE_THRESHOLD = 5; // 判斷為點擊的最大移動距離閾值（像素）
let lastClickTime = 0; // 上次點擊的時間戳
const DEBOUNCE_TIME = 300; // 防抖時間（毫秒）

// 計算被拖拽標籤的樣式
const getTabStyle = (index) => {
  if (index === draggingIndex.value) {
    return {
      transform: `translateX(${dragOffset.value}px)`,
      zIndex: 1,
      transition: "none",
    };
  }
  return {};
};

// 判斷是否應該在標籤前顯示插入指示器
const shouldShowInsertBefore = (index) => {
  return potentialIndex.value === index && draggingIndex.value > index;
};

// 判斷是否應該在標籤後顯示插入指示器
const shouldShowInsertAfter = (index) => {
  return potentialIndex.value === index && draggingIndex.value < index;
};

// 開始拖拽的處理函數
const startDrag = (event, index) => {
  const isTouch = event.type.includes("touch"); // 判斷是否為觸摸事件 for mobile
  startTime = new Date().getTime();
  // 記錄起始位置
  if (isTouch) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  } else {
    startX = event.clientX;
    startY = event.clientY;
  }
  startIndex = index;
  draggingIndex.value = index;
  // 獲取被拖拽的 DOM 元素
  draggedElement = event.target.closest(".draggable-tab");

  // 添加相應的事件監聽器
  if (isTouch) {
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
  } else {
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }
};

// 拖拽過程中的處理函數
const onDrag = (event) => {
  const isTouch = event.type.includes("touch");
  const currentX = isTouch ? event.touches[0].clientX : event.clientX;
  // 計算拖拽的水平偏移量 用來顯示拖拽效果 讓拖曳的元素跟著滑鼠移動
  dragOffset.value = currentX - startX;

  // 使用被拖拽元素的實際寬度
  const tabWidth = draggedElement.offsetWidth;
  // 計算可能的新索引位置
  const newIndex = startIndex + Math.round(dragOffset.value / tabWidth);
  // 確保新索引在有效範圍內
  potentialIndex.value = Math.max(0, Math.min(newIndex, tabs.value.length - 1));
};

// 結束拖拽的處理函數
const stopDrag = (event) => {
  const endTime = new Date().getTime();
  const isTouch = event.type.includes("touch");
  const currentX = isTouch ? event.changedTouches[0].clientX : event.clientX;
  const currentY = isTouch ? event.changedTouches[0].clientY : event.clientY;
  // 計算拖拽的距離
  const dx = currentX - startX;
  const dy = currentY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 判斷是點擊還是拖拽
  if (
    endTime - startTime < CLICK_TIME_THRESHOLD &&
    distance < CLICK_DISTANCE_THRESHOLD
  ) {
    handleClick(tabs.value[startIndex]);
  } else if (
    potentialIndex.value !== null &&
    potentialIndex.value !== startIndex
  ) {
    // 如果是拖拽，更新標籤順序
    const [removed] = tabs.value.splice(startIndex, 1);
    tabs.value.splice(potentialIndex.value, 0, removed);
  }

  // 重置所有狀態
  draggingIndex.value = null;
  dragOffset.value = 0;
  potentialIndex.value = null;
  draggedElement = null;

  // 移除事件監聽器
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
};

// 處理點擊事件
const handleClick = (tab) => {
  const now = new Date().getTime();
  // 防抖處理，避免短時間內多次觸發
  if (now - lastClickTime > DEBOUNCE_TIME) {
    console.log("Clicked tab:", tab);
    // 這裡可以添加更多點擊處理邏輯，比如切換到被點擊的標籤
    lastClickTime = now;
  }
};

// 組件掛載時添加全局事件監聽器
onMounted(() => {
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
});

// 組件卸載時移除全局事件監聽器
onUnmounted(() => {
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
});
</script>

<style scoped>
.draggable-tabs {
  overflow-x: auto;
  touch-action: pan-y; /* 允許垂直平移，但禁用水平平移 */
}

.draggable-tab {
  touch-action: none; /* 禁用所有觸摸操作，確保拖拽的流暢性 */
  position: relative;
}

.draggable-tab.is-dragging {
  opacity: 0.7; /* 視覺反饋，表示正在拖拽 */
}

/* 插入指示器樣式 */
.draggable-tab.insert-before::before,
.draggable-tab.insert-after::after {
  content: "";
  position: absolute;
  top: 20%;
  bottom: 20%;
  width: 2px;
  background-color: #1976d2; /* 使用 Quasar 主題藍色 */
}

.draggable-tab.insert-before::before {
  left: -1px;
}

.draggable-tab.insert-after::after {
  right: -1px;
}
</style>

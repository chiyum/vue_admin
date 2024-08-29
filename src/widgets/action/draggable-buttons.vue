<template>
  <div
    ref="buttonsContainerRef"
    class="draggable-buttons-container"
    :class="{ 'is-dragging': draggingIndex !== null }"
  >
    <q-btn
      v-for="(button, index) in buttons"
      :key="button.name"
      class="draggable-button q-ma-xs"
      :class="{
        'is-dragging': draggingIndex === index,
        'insert-before': shouldShowInsertBefore(index),
        'insert-after': shouldShowInsertAfter(index),
      }"
      :style="getButtonStyle(index)"
      v-bind="otherBind"
      @mousedown.prevent="startDrag($event, index)"
      @touchstart.prevent="startDrag($event, index)"
      @click.self="callback"
    >
      <slot name="button" :data="button">{{ button.label }}</slot>
    </q-btn>
  </div>
</template>

<script setup>
// 定義組件的 props
const props = defineProps({
  initialButtons: {
    type: Array,
    required: true,
  },
  otherBind: {
    type: Object,
    default: () => ({}),
  },
  callback: {
    type: Function,
    default: () => {},
  },
});

// 使用 ref 創建響應式數據
const buttons = ref([...props.initialButtons]); // 複製初始按鈕列表
const draggingIndex = ref(null); // 當前正在拖拽的按鈕索引
const dragOffset = ref(0); // 拖拽的水平偏移量
const buttonsContainerRef = ref(null); // 按鈕容器的引用
const potentialIndex = ref(null); // 拖拽過程中的潛在新位置

// 用於跟踪拖拽狀態的變量
let startX = 0; // 開始拖拽時的 X 坐標
let startY = 0; // 開始拖拽時的 Y 坐標
let startTime = 0; // 開始拖拽的時間戳
let startIndex = 0; // 開始拖拽的按鈕索引
let draggedElement = null; // 當前被拖拽的 DOM 元素

// 常量定義
const CLICK_TIME_THRESHOLD = 200; // 判斷為點擊的最大時間閾值（毫秒）
const CLICK_DISTANCE_THRESHOLD = 5; // 判斷為點擊的最大移動距離閾值（像素）
let lastClickTime = 0; // 上次點擊的時間戳
const DEBOUNCE_TIME = 300; // 防抖時間（毫秒）

// 計算被拖拽按鈕的樣式
const getButtonStyle = (index) => {
  if (index === draggingIndex.value) {
    return {
      transform: `translateX(${dragOffset.value}px)`,
      zIndex: 1,
      transition: "none",
    };
  }
  return {};
};

// 判斷是否應該在按鈕前顯示插入指示器
const shouldShowInsertBefore = (index) => {
  return potentialIndex.value === index && draggingIndex.value > index;
};

// 判斷是否應該在按鈕後顯示插入指示器
const shouldShowInsertAfter = (index) => {
  return potentialIndex.value === index && draggingIndex.value < index;
};

// 開始拖拽的處理函數
const startDrag = (event, index) => {
  const isTouch = event.type.includes("touch");
  startTime = new Date().getTime();
  if (isTouch) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  } else {
    startX = event.clientX;
    startY = event.clientY;
  }
  startIndex = index;
  draggingIndex.value = index;
  draggedElement = event.target.closest(".draggable-button");

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
  dragOffset.value = currentX - startX;

  const buttonWidth = draggedElement.offsetWidth;
  const newIndex = startIndex + Math.round(dragOffset.value / buttonWidth);
  potentialIndex.value = Math.max(
    0,
    Math.min(newIndex, buttons.value.length - 1)
  );
};

// 結束拖拽的處理函數
const stopDrag = (event) => {
  const endTime = new Date().getTime();
  const isTouch = event.type.includes("touch");
  const currentX = isTouch ? event.changedTouches[0].clientX : event.clientX;
  const currentY = isTouch ? event.changedTouches[0].clientY : event.clientY;
  const dx = currentX - startX;
  const dy = currentY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (
    endTime - startTime < CLICK_TIME_THRESHOLD &&
    distance < CLICK_DISTANCE_THRESHOLD
  ) {
    handleClick(buttons.value[startIndex]);
  } else if (
    potentialIndex.value !== null &&
    potentialIndex.value !== startIndex
  ) {
    const [removed] = buttons.value.splice(startIndex, 1);
    buttons.value.splice(potentialIndex.value, 0, removed);
  }

  draggingIndex.value = null;
  dragOffset.value = 0;
  potentialIndex.value = null;
  draggedElement = null;

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
};

// 處理點擊事件
const handleClick = (button) => {
  const now = new Date().getTime();
  if (now - lastClickTime > DEBOUNCE_TIME) {
    console.log("Clicked button:", button);
    // 這裡可以添加更多點擊處理邏輯
    lastClickTime = now;
  }
};

watch(
  () => props.initialButtons,
  (newButtons) => {
    console.log("update buttons", newButtons);

    // 創建一個 Map 來存儲當前 buttons 中的所有按鈕，以 name 為鍵
    const currentButtonsMap = new Map(
      buttons.value.map((button) => [button.name, button])
    );

    // 創建一個新的按鈕數組
    const updatedButtons = [];

    // 遍歷新的按鈕列表
    newButtons.forEach((newButton) => {
      if (currentButtonsMap.has(newButton.name)) {
        // 如果按鈕已存在，使用現有的按鈕（保留可能的拖拽順序）
        updatedButtons.push(currentButtonsMap.get(newButton.name));
        currentButtonsMap.delete(newButton.name);
      } else {
        // 如果是新按鈕，添加到列表中
        updatedButtons.push(newButton);
      }
    });

    // 更新 buttons.value
    buttons.value = updatedButtons;
  },
  { deep: true }
);

onMounted(() => {
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
});

onUnmounted(() => {
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
});
</script>

<style scoped>
.draggable-buttons-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  touch-action: pan-x pan-y;
  -webkit-overflow-scrolling: touch;
}

.draggable-button {
  flex-shrink: 0;
  touch-action: none;
}

.draggable-button.is-dragging {
  opacity: 0.7;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.draggable-button.insert-before::before,
.draggable-button.insert-after::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 100%;
  background-color: #1976d2;
}

.draggable-button.insert-before::before {
  left: -4px;
}

.draggable-button.insert-after::after {
  right: -4px;
}
</style>

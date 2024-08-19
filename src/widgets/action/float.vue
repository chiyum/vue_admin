<template>
  <div
    ref="draggableElement"
    :style="{
      position: positionType,
      left: position.x + 'px',
      top: position.y + 'px',
      cursor: cursor,
      userSelect: 'none',
      zIndex: props.zIndex,
    }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <slot :onAction="handleAction">拖曳我</slot>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";

// 定義組件的 props
const props = defineProps({
  wrapper: {
    type: String,
    default: "", // 容器選擇器，為空時使用父元素
  },
  zIndex: {
    type: Number,
    default: 2000, // 元素的 z-index
  },
  defaultPosition: {
    type: Object,
    default: () => ({ x: 0, y: 0 }), // 默認位置
  },
  cursor: {
    type: String,
    default: "move", // 滑鼠游標樣式
  },
  positionType: {
    type: String,
    default: "absolute", // 定位類型
  },
});

// 定義事件
const emit = defineEmits(["onClick", "onDragEnd"]);

// 響應式變數和引用
const draggableElement = ref(null); // 可拖曳元素的引用
const containerElement = ref(null); // 容器元素的引用
const position = reactive({ x: 0, y: 0 }); // 當前位置
const isDragging = ref(false); // 是否正在拖曳
const hasMoved = ref(false); // 是否已移動
const offset = reactive({ x: 0, y: 0 }); // 鼠標點擊位置與元素左上角的偏移
const dragStartTime = ref(0); // 開始拖曳的時間
const dragStartPosition = reactive({ x: 0, y: 0 }); // 開始拖曳的位置

// 常量
const dragThreshold = 5; // 拖曳閾值（像素）
const clickThreshold = 200; // 點擊閾值（毫秒）

// 開始拖曳
const startDrag = (event) => {
  event.preventDefault(); // 防止默認行為（如文本選擇）
  isDragging.value = true;
  hasMoved.value = false;
  dragStartTime.value = Date.now();

  // 獲取觸摸或滑鼠事件的客戶端坐標
  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;

  dragStartPosition.x = clientX;
  dragStartPosition.y = clientY;
  offset.x = clientX - position.x;
  offset.y = clientY - position.y;

  // 添加事件監聽器
  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
};

// 拖曳過程
const drag = (event) => {
  event.preventDefault(); // 防止滾動等默認行為
  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;

  const deltaX = clientX - dragStartPosition.x;
  const deltaY = clientY - dragStartPosition.y;

  // 判斷是否超過拖曳閾值
  if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
    hasMoved.value = true;
  }

  if (isDragging.value) {
    const containerRect = containerElement.value.getBoundingClientRect();
    const elementRect = draggableElement.value.getBoundingClientRect();

    // 計算新位置
    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    // 限制元素在容器內
    newX = Math.max(0, Math.min(newX, containerRect.width - elementRect.width));
    newY = Math.max(
      0,
      Math.min(newY, containerRect.height - elementRect.height)
    );

    // 更新位置
    position.x = newX;
    position.y = newY;
  }
};

// 停止拖曳
const stopDrag = (event) => {
  const dragDuration = Date.now() - dragStartTime.value;
  const isClick = !hasMoved.value && dragDuration <= clickThreshold;

  // 移除事件監聽器
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);

  if (isClick) {
    // 如果是點擊（沒有明顯移動且持續時間短），觸發點擊事件
    handleAction(event);
  } else if (hasMoved.value) {
    // 如果有移動，觸發拖曳結束事件
    emit("onDragEnd", { x: position.x, y: position.y });
  }

  // 重置狀態
  isDragging.value = false;
  hasMoved.value = false;
};

// 處理動作（點擊）
const handleAction = (event) => {
  const isMobile = event.type.startsWith("touch");
  emit("onClick", { event, isMobile });
};

// 設置容器元素
const setContainer = () => {
  const wrapperElement = props.wrapper
    ? document.querySelector(props.wrapper)
    : draggableElement.value.parentNode;
  containerElement.value = wrapperElement;
  if (!containerElement.value) {
    console.error("拖曳容器元素未找到");
  }
};

// 設置默認位置
const setDefaultPosition = () => {
  position.x = props.defaultPosition.x;
  position.y = props.defaultPosition.y;
};

// 組件掛載時的操作
onMounted(() => {
  setContainer();
  // 等待元素渲染完成後再設定位置
  nextTick(() => {
    setDefaultPosition();
  });
});

// 組件卸載時的清理操作
onUnmounted(() => {
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
});
</script>

<template>
  <div
    ref="draggableElement"
    :style="{
      position: 'absolute',
      left: position.x + 'px',
      top: position.y + 'px',
      cursor: cursor,
      userSelect: 'none',
      zIndex: props.zIndex,
    }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <slot :onAction="handleClick">拖曳我</slot>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps({
  wrapper: {
    type: String,
    default: "",
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  defaultPosition: {
    type: Object,
    default: () => ({ x: 0, y: 0 }),
  },
  cursor: {
    type: String,
    default: "move",
  },
});

const emit = defineEmits(["onClick"]);

const draggableElement = ref(null);
const containerElement = ref(null);
const position = reactive({ x: 0, y: 0 });
const isDragging = ref(false);
const offset = reactive({ x: 0, y: 0 });
const dragStartTime = ref(0);
const dragStartPosition = reactive({ x: 0, y: 0 });
const dragThreshold = 5; // 像素
const clickThreshold = 200; // 毫秒

const startDrag = (event) => {
  event.preventDefault(); // 防止移動設備上的滾動
  isDragging.value = false;
  dragStartTime.value = Date.now();
  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;
  dragStartPosition.x = clientX;
  dragStartPosition.y = clientY;
  offset.x = clientX - position.x;
  offset.y = clientY - position.y;

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
};

const drag = (event) => {
  event.preventDefault(); // 防止在拖動時滾動頁面
  const clientX = event.clientX ?? event.touches[0].clientX;
  const clientY = event.clientY ?? event.touches[0].clientY;

  const deltaX = clientX - dragStartPosition.x;
  const deltaY = clientY - dragStartPosition.y;

  if (
    !isDragging.value &&
    (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold)
  ) {
    isDragging.value = true;
  }

  if (isDragging.value) {
    const containerRect = containerElement.value.getBoundingClientRect();
    const elementRect = draggableElement.value.getBoundingClientRect();

    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    // 限制X軸移動範圍
    newX = Math.max(0, Math.min(newX, containerRect.width - elementRect.width));

    // 限制Y軸移動範圍
    newY = Math.max(
      0,
      Math.min(newY, containerRect.height - elementRect.height)
    );

    position.x = newX;
    position.y = newY;
  }
};

const stopDrag = (event) => {
  const isClick =
    !isDragging.value && Date.now() - dragStartTime.value <= clickThreshold;

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);

  if (isClick) {
    handleClick(event);
  }

  isDragging.value = false;
};

const handleClick = (event) => {
  const isMobile = event.type.startsWith("touch");
  emit("onClick", { event, isMobile });
};

const setContainer = () => {
  const wrapperElement = props.wrapper
    ? document.querySelector(props.wrapper)
    : draggableElement.value.parentNode;
  containerElement.value = wrapperElement;
  if (!containerElement.value) {
    console.error("拖曳容器元素未找到");
  }
};

const setDefaultPosition = () => {
  position.x = props.defaultPosition.x;
  position.y = props.defaultPosition.y;
};

onMounted(() => {
  setContainer();
  // 等待元素渲染完成後再設定位置
  nextTick(() => {
    setDefaultPosition();
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
});
</script>

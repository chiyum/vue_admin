<script setup lang="ts">
import { defineModel } from "vue";
const Props = defineProps({
  bind: {
    type: Object,
    default: () => ({}),
  },
});
const Emit = defineEmits(["update"]);
const Model = defineModel({ type: String, default: "" });
const clear = () => (Model.value = "");
const onUpdate = () => {
  Emit("update");
};

watch(() => Model.value, onUpdate);
</script>

<template>
  <q-input v-model="Model" v-bind="Props.bind">
    <template #prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="fade" transition-hide="fade">
          <div class="date-and-time">
            <q-date v-model="Model" mask="YYYY-MM-DD HH:mm" />
            <q-time v-model="Model" mask="YYYY-MM-DD HH:mm" />
          </div>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template #append>
      <q-icon name="highlight_off" class="cursor-pointer" @click="clear" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped>
.date-and-time {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.1rem;
}
</style>

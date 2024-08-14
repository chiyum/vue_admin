<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-img class="col" :src="src" />

      <q-card-actions vertical class="justify-around q-px-md">
        <slot>
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="accent" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </slot>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  src: {
    type: String,
    default: "",
  },
});
</script>

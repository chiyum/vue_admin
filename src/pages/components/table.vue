<template>
  <div></div>
</template>
<script setup>
import axios from "@/services/http-service";
axios.get("/users").then((response) => {
  console.log(response.data);
});
</script>

<template>
  <div></div>
</template>
<script setup>
import axios from "@/services/http-service";
axios.get("/mock-api/users").then((response) => {
  console.log(response.data);
});
</script>

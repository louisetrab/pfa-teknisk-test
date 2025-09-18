<template>
  <header class="page-title">
    <h1>{{ text }}</h1>
  </header>
</template>

<script setup lang="ts">
// Recieves title
defineProps<{ text: string }>();
</script>

<style scoped>
.page-title {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
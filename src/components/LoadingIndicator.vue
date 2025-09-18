<template>
  <div class="loading-indicator" role="status" aria-live="polite">
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
// Loading message
defineProps<{ message?: string }>();
</script>

<style scoped>
.loading-indicator {
  font-size: 1.2rem;
  color: #016168;
  padding: 2rem;
  text-align: center;
}
</style>

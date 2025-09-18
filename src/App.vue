<template>
  <div class="page" role="main">
    <PageTitle text="PFA Clients" />
    <div class="layout">
      <PersonList />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "./components/PageTitle.vue";
import PersonList from "./components/PersonList.vue";
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #ececec;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
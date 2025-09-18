<template>
  <FilterPanel
    @update:gender="selectedGenders = $event"
    @update:age="selectedAges = $event"
  />

  <div class="card-area">
    <!-- Loader while data if fetched -->
    <LoadingIndicator v-if="loading" message="Loading Clients…" />

    <!-- Show card when data is ready -->
    <div v-else class="card-list">
      <PersonCard
        v-for="person in filteredPeople"
        :key="person.name"
        :name="person.name"
        :height="person.height"
        :gender="person.gender"
        :birth_year="person.birth_year"
        :eye_color="person.eye_color"
        :homeworld="person.homeworld"
        :movieCount="person.films.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import FilterPanel from './FilterPanel.vue';
import PersonCard from './PersonCard.vue';
import LoadingIndicator from './LoadingIndicator.vue';

import { fetchPeople, type Person } from '../services/swapi';
import { estimateAge } from '../utils/age';
import { matchesAgeRange } from '../utils/filters';

const people = ref<Person[]>([]);
const selectedGenders = ref<string[]>([]);
const selectedAges = ref<string[]>([]);
const loading = ref(true);

// Fetch people at mount - turn off loaderwhen done
onMounted(async () => {
  people.value = await fetchPeople();
  loading.value = false;
});

// Computed: filter perople by gender and age
const filteredPeople = computed(() =>
  people.value.filter((person) => {
    const age = estimateAge(person.birth_year);
    const genderMatch =
      selectedGenders.value.length === 0 ||
      selectedGenders.value.includes(person.gender);
    const ageMatch = matchesAgeRange(age, selectedAges.value);
    return genderMatch && ageMatch;
  })
);
</script>

<style scoped lang="scss">
/* Wrapper for loader and card */
.card-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.card-list {
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(1, 250px);
  justify-content: center;
}

@media (min-width: 576px) {
  .card-list {
    grid-template-columns: repeat(2, 250px);
    justify-content: start;
  }
}

@media (min-width: 769px) {
  .card-list {
    grid-template-columns: repeat(3, 250px);
  }
}
</style>
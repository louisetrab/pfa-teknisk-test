<template>
  <section :class="['filters', { expanded: showFilters }]">
    <button
      class="filter-header"
      @click="toggleFilters"
      :aria-expanded="showFilters"
      aria-controls="filter-body"
    >
      <i class="fas fa-filter" aria-hidden="true"></i>
      <h3>Filter</h3>
    </button>

    <!-- Filtering options -->
    <div v-if="showFilters" id="filter-body" class="filter-body">
      <fieldset>
        <legend>Gender</legend>
        <label><input type="checkbox" value="male" v-model="localGenders" /> Male</label>
        <label><input type="checkbox" value="female" v-model="localGenders" /> Female</label>
      </fieldset>

      <fieldset>
        <legend>Age Range</legend>
        <label><input type="checkbox" value="0to20" v-model="localAges" /> 0–20</label>
        <label><input type="checkbox" value="20to40" v-model="localAges" /> 20–40</label>
        <label><input type="checkbox" value="40to60" v-model="localAges" /> 40–60</label>
        <label><input type="checkbox" value="60to80" v-model="localAges" /> 60–80</label>
        <label><input type="checkbox" value="80plus" v-model="localAges" /> 80+</label>
      </fieldset>

      <!-- Active filters and reset button -->
      <div class="filter-summary">
        <p v-if="summaryText">{{ summaryText }}</p>
        <button @click="clearFilters">Clear Filters</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const emit = defineEmits(['update:gender', 'update:age']);
const localGenders = ref<string[]>([]);
const localAges = ref<string[]>([]);

// Emits changes in checkbox groups
watch(localGenders, (val) => emit('update:gender', val));
watch(localAges, (val) => emit('update:age', val));

// Filter open on desktop
const showFilters = ref(window.innerWidth > 768);
function toggleFilters() {
  if (window.innerWidth <= 768) {
    showFilters.value = !showFilters.value;
  }
}
function clearFilters() {
  localGenders.value = [];
  localAges.value = [];
}

// Shows the which filters are active
const summaryText = computed(() => {
  const gender = localGenders.value.length
    ? localGenders.value.join(' and ')
    : 'All genders';
  const ageLabels: Record<string, string> = {
    '0to20': '0–20',
    '20to40': '20–40',
    '40to60': '40–60',
    '60to80': '60–80',
    '80plus': '80+',
  };
  const ages = localAges.value.map((key) => ageLabels[key]).join(', ');
  const ageText = localAges.value.length ? `aged ${ages}` : 'all ages';
  return `Showing ${gender} characters ${ageText}`;
});
</script>

<style scoped lang="scss">
/* Filter section */
.filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &.expanded {
    flex: 0 0 220px;
    background-color: #ececec;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    align-items: flex-start;
    text-align: left;

    &.expanded {
      border: none;
      padding: 0;
    }
  }
}

/* Toggle button */
.filter-header {
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9b0000;
  cursor: pointer;
  justify-content: flex-start;

  i {
    font-size: 1.2rem;
    color: #016168;
  }

  &:focus {
    outline: 2px solid #016168;
    outline-offset: 2px;
  }
}

/* Content in filter */
.filter-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

fieldset {
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;

  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
}

legend {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333333;
}

label {
  color: #333333;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }
}

input[type="checkbox"] {
  accent-color: #9b0000;
}

.filter-summary {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333333;

  @media (max-width: 768px) {
    text-align: left;
  }
}
</style>
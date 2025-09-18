<template>
  <article
    class="card"
    @click="flipped = !flipped"
    tabindex="0"
    role="button"
    :aria-pressed="flipped"
  >
    <div class="card-inner" :class="{ flipped }">
      <!-- Front -->
      <div class="card-front" :aria-hidden="flipped">
        <h2 class="name">{{ name }}</h2>
        <p class="gender">Gender: {{ gender }}</p>
        <p class="birth_year">Birth Year: {{ birth_year }}</p>
        <p class="homeworld">Homeworld: {{ homeworld }}</p>
      </div>

      <!-- Back -->
      <div class="card-back" :aria-hidden="!flipped">
        <h2 class="name">{{ name }}</h2>
        <p class="height">Height: {{ height }} cm</p>
        <p class="eye_color">Eye Color: {{ eye_color }}</p>
        <p class="movies">Appears in {{ movieCount }} movies</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define the props .card should recieve
defineProps<{
  name: string;
  height: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  homeworld: string;
  movieCount: number;
}>();
const flipped = ref(false);
</script>

<style scoped lang="scss">
.card {
  width: 250px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
}

/* Card rotation */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
}

.card-front,
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 5px 11px rgba(0, 0, 0, 0.1);
  background-color: #ececec;
  color: #333333;
  backface-visibility: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-back {
  transform: rotateY(180deg);
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #9b0000;
}
.gender,
.birth_year,
.homeworld,
.height,
.eye_color,
.movies {
  font-size: 0.95rem;
  margin: 0.5rem 0;
}
</style>
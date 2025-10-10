<script setup lang="ts">
const model = defineModel()
defineProps({
  placeholder: {
    type: String,
    default: 'Digite algo...',
  }
})
</script>

<template>
  <input type="text"
         :placeholder="placeholder"
         v-model="model"
  >
</template>

<style scoped>

input {
  width: 100%;
  height: 40px;
  display: flex;
  padding: 10px;
  background: none;
  border: none;
  border-bottom: 2px solid #1E202E;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
}

input::placeholder {
  color: #1E202E;
  font-size: 1rem;
  font-weight: 600;
}

input:focus {
  outline: none;
}

</style>
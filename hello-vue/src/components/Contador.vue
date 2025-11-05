<script setup lang="ts">
import {ref, onMounted, onUpdated, onUnmounted} from 'vue'

const valor = ref(0)

onMounted(() => {
  console.log('✅ Componente montado!')
})

onUpdated(() => {
  console.log('🔁 Componente atualizado! Valor atual:', valor.value)
})

onUnmounted(() => {
  console.log('🗑️ Componente desmontado!')
})

</script>

<template>

  <div class="contador">
    <p>Valor: {{ valor }}</p>
    <button @click="valor++">Incrementar</button>
  </div>

</template>

<style scoped>
.contador {
  border: 1px solid var(--cor-primaria);
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  background-color: var(--cor-primaria);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

</style>
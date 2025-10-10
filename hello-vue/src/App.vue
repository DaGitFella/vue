<template>
  <div>
    <button @click="exibirAtividadeUm = !exibirAtividadeUm">
      {{ exibirAtividadeUm ? 'Ocultar' : 'Mostrar' }} atividade 1
    </button>
    <button @click="exibirAtividadeDois = !exibirAtividadeDois">
      {{ exibirAtividadeDois ? 'Ocultar' : 'Mostrar' }} atividade 2
    </button>
  </div>

  <div v-if="exibirAtividadeUm">
    <h2>Contador simples</h2>
    <atividadeUm />
  </div>

  <div v-if="exibirAtividadeDois" class="grey-background">
    <h2>Listagem simples</h2>
    <atividade-dois />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import atividadeUm from './components/atividadeUm.vue';
import atividadeDois from './components/atividadeDois.vue';

const exibirAtividadeUm = ref(false)
const exibirAtividadeDois = ref(false)

</script>

<style scoped>

h2 {
  text-align: center;
}

</style>
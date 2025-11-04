<template>
  <h1>Aplicação Vue com componentes</h1>

  <div class="show-buttons-list">
    <button @click="exibirAtividadeUm = !exibirAtividadeUm">
      {{ exibirAtividadeUm ? 'Ocultar' : 'Mostrar' }} atividade 1
    </button>
    <button @click="exibirAtividadeDois = !exibirAtividadeDois">
      {{ exibirAtividadeDois ? 'Ocultar' : 'Mostrar' }} atividade 2
    </button>
    <button @click="exibirAtividadeTres = !exibirAtividadeTres">
      {{ exibirAtividadeTres ? 'Ocultar': 'Mostrar' }} atividade 3
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

  <div v-if="exibirAtividadeTres">
    <h2>Exibição condicional</h2>

    <Mensagem v-if="mostrar"/>
    <p v-else>Nenhuma mensagem registrada.</p>

    <button @click="mostrar = !mostrar">
      Alterar exibição
    </button>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import atividadeUm from './components/atividadeUm.vue';
import atividadeDois from './components/atividadeDois.vue';
import Mensagem from './components/Mensagem.vue';

const exibirAtividadeUm = ref(false)
const exibirAtividadeDois = ref(false)
const exibirAtividadeTres = ref(false)
const mostrar = ref(false)

</script>

<style scoped>

h2 {
  text-align: center;
}

.show-buttons-list {
  display: flex;
  gap: 20px;
}

</style>
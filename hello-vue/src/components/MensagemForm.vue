<script setup>

import { ref } from "vue";

const emit = defineEmits(['adicionar', 'limpar'])

const props = defineProps({
  showClear: Boolean,
  categorias: Array,
})

const titulo = ref('')
const autor = ref('')
const texto = ref('')
const categoria = ref('')

function agoraIso() {
  return new Date().toISOString()
}

function limpar() {
  emit('limpar')
}

function adicionar() {
  if (!titulo.value || !texto.value) return

  emit('adicionar', {
    titulo: titulo.value,
    autor: autor.value,
    texto: texto.value || "Anônimo",
    dataHoraIso: agoraIso(),
    categoria: categoria.value,
  })

  titulo.value = ''
  autor.value = ''
  texto.value = ''
}

</script>

<template>

  <form class="form" @submit.prevent="adicionar">
    <input v-model.trim="titulo" placeholder="Título" required />

    <textarea v-model.trim="texto" placeholder="Conteúdo da mensagem" required rows="3"></textarea>

    <select v-model.trim="categoria" required>
      <option value="">Selecione a categoria</option>

      <option v-for="catg in categorias" :key="catg.id">{{ catg.categoria }}</option>
    </select>

    <input v-model.trim="autor" placeholder="Autor (opcional)" />

    <button type="submit" @keydown.enter="adicionar">Adicionar</button>
  </form>

  <button v-if="props.showClear" @click="limpar">Limpar</button>

</template>

<style scoped>
.form {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

textarea,
input,
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: none;
}

button {
  padding: 8px 12px;
  border: none;
  background: var(--cor-primaria, #42b983);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: .9;
}
</style>
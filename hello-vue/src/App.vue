<template>
  <h1>Parte 1</h1>
  <div>
    <p :class="classContadorUm">Contador: {{ contador }}</p>
    <button @click="incrementar">Incrementar</button>
    <button @click="decrementar">Decrementar</button>
  </div>

  <div>
    <p :class="classContadorDois">Contador 2: {{ contadorDois }}</p>
    <button @click="incrementar2">Incrementar</button>
    <button @click="decrementar2">Decrementar</button>
  </div>

  <p>Soma dos contadores: {{ somaContadores }}</p>
  <p>----------------------------------------------------------------------------------------</p>
  <h1>Parte 2</h1>
  <form @submit.prevent="adicionar">
    <input v-model.trim="novaMensagem" placeholder="Digite uma mensagem" />
    <button :disabled="!novaMensagem">Adicionar</button>
  </form>

  <p>{{ erro }}</p>

  <input v-model="filtro" placeholder="Busque uma tarefa"/>

  <ul v-if="mensagens.itens.length">
    <li v-for="mensagem in mensagensFiltradas" :key="mensagem.id">
      <div v-if="idItemEditando !== mensagem.id" class="estiloBotoes">
        <p :class="{ longo: mensagem.texto.length > 30}">{{ mensagem.id }} -- {{ mensagem.texto }}</p>
        <button @click="remover(mensagem.id)">x</button>
        <button @click="editarMensagem(mensagem.id)">editar</button>
      </div>

      <div v-if="idItemEditando === mensagem.id" class="estiloBotoes">
        <input v-model="mensagem.texto">
        <button @click="idItemEditando = null">Salvar</button>
      </div>

    </li>

    <p>exibindo {{mensagensFiltradas.length}} de
      {{mensagens.itens.length}}</p>
  </ul>
  <p v-else>Lista vazia</p>
  <button @click="limpar" v-if="mensagens.itens.length">Limpar lista</button>
  <p>----------------------------------------------------------------------------------------</p>
</template>

<script setup>
import {ref, computed, reactive} from 'vue'

// Parte 1

const contador = ref(0)

const contadorDois = ref(1)

const somaContadores = computed(() => contador.value + contadorDois.value)

const classContadorUm = computed(() => contador.value > contadorDois.value ? 'destaque': '')
const classContadorDois = computed(() => contadorDois.value > contador.value ? 'destaque': '')

const incrementar = () => {
  contador.value++
}

const decrementar = () => {
  contador.value > 0 ? contador.value-- : 0
}

const incrementar2 = () => {
  contadorDois.value++
}

const decrementar2 = () => {
  contadorDois.value > 0 ?contadorDois.value -- : 0
}

// -----------------------------------------------------------------------------------------------------------------------

// Parte 2

let mensagens = reactive({
  nextId: 1,
  itens: [
  ]
})

const filtro = ref('')

const erro = ref('')

const mensagensFiltradas  = computed(() => {
  if (!filtro.value) {
    return mensagens.itens;
  }

  const buscaLowerCase = filtro.value.toLowerCase();

  return mensagens.itens.filter(mensagem => {
    return mensagem?.texto.toLowerCase().includes(buscaLowerCase);
  })
})

const novaMensagem = ref('')

const adicionar = () => {
  if (novaMensagem.value) {
    mensagens.itens.push({id: mensagens.nextId++, texto: novaMensagem.value, editando: false})
  } else {
    erro.value = 'o campo enviado estava vazio'
  }
}

function remover(id) {
  mensagens.itens = mensagens.itens.filter(m => m?.id !== id)
}

const idItemEditando = ref(null)

function editarMensagem(id) {
  idItemEditando.value = id
}

const limpar = () => {
  mensagens.itens = []
}

</script>

<style scoped>

.destaque {
  font-weight: bold;
  color: red
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.longo {
  color: green;
  font-weight: bold;
}

.estiloBotoes {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
</style>
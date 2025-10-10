<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import textInput from "./form/textInput.vue";

interface Mensagem {
  id: number,
  texto: string
}

let mensagens = reactive({
  nextId: 1,
  itens: [] as Mensagem[]
})

const filtro = ref('')

const erro = ref('')

const erroEdicao = ref('')

const novaMensagem = ref('')

const mensagensFiltradas = computed(() => {
  if (!filtro.value) {
    return mensagens.itens;
  }

  const buscaLowerCase = filtro.value.toLowerCase();

  return mensagens.itens.filter(mensagem => {
    return mensagem.texto.toLowerCase().includes(buscaLowerCase);
  })
})


const adicionar = () => {
  if (novaMensagem.value) {
    mensagens.itens.push({id: mensagens.nextId++, texto: novaMensagem.value})
  } else {
    erro.value = 'o campo enviado estava vazio'
  }
}

function remover(id: number) {
  mensagens.itens = mensagens.itens.filter(m => m.id !== id)
}

const idItemEditando = ref(null)

function editarMensagem(id: number) {
  idItemEditando.value = id
}

function finalizarEdicao(novaMensagem): void {
  if (!novaMensagem) {
    erroEdicao.value = 'Mensagem vazia'
  } else {
    idItemEditando.value = null
    erroEdicao.value = ''
  }
}

const limpar = () => {
  console.log('limpando...')
  mensagens.itens = []
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="adicionar" class="pretty-form">
      <textInput v-model.trim="novaMensagem"
                 placeholder="Digite uma mensagem..."
      />
      <div class="add-form-buttons">
        <button type="submit" :disabled="!novaMensagem">Adicionar</button>
        <button type="button" @click="limpar" v-show="mensagens.itens.length">Limpar lista</button>
      </div>
      <p>{{ erro }}</p>
    </form>

    <textInput v-model="filtro" style="width: 100%" placeholder="Busque uma mensagem..."/>

    <ul v-if="mensagens.itens.length" class="list-group">
      <li v-for="mensagem in mensagensFiltradas" :key="mensagem.id">
        <div v-if="idItemEditando !== mensagem.id" class="list-item">
          <p :class="{ longo: mensagem.texto.length > 30}" class="list-item-text">
            <span class="destaque">#{{ mensagem.id }}</span> - {{ mensagem.texto }}
          </p>
          <div class="estiloBotoes">
            <button @click="remover(mensagem.id)" class="delete-button">x</button>
            <button @click="editarMensagem(mensagem.id)" class="edit-button">Editar</button>
          </div>
        </div>

        <div v-if="idItemEditando === mensagem.id" class="estiloBotoes">
          <input v-model="mensagem.texto">
          <button @click="finalizarEdicao(mensagem.texto)" class="save-button">Salvar</button>
          <p>{{ erroEdicao }}</p>
        </div>

      </li>

      <p class="currently-showing">exibindo {{ mensagensFiltradas.length }} de
        {{ mensagens.itens.length }}</p>
    </ul>
    <p v-else>Lista vazia</p>
  </div>
</template>

<style scoped>

.container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pretty-form {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
}

.add-form-buttons {
  display: flex;
  padding: 0;
  padding-left: 10px;
  margin: 0;
  gap: 10px;
}

.add-form-buttons button {
  display: flex;
  padding: 10px 2px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  aspect-ratio: 62/35;
  border: none;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.25);
  background: none;
  color: #040404;
  font-size: 16px;
  font-weight: bold;
  transition: all ease-in-out 0.5s;
  cursor: pointer;
}

.add-form-buttons button:hover {
  border: none;
  background-color: #1E202E;
  color: #fff;
}

.list-group {
  background-color: #1E202E;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-item {
  display: flex;
  padding: 0 40px;
}

.list-item-text {
  font-size: 30px;
  color: white;
}

.destaque {
  color: #9F91D1;
  font-weight: 700;
}

.estiloBotoes {
  display: flex;
  align-items: center;
  gap: 20px;
}

.delete-button {
  border-radius: 20px;
  background: #A61426;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.25);
  color: #FFF;
  font-size: 16px;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
}

.edit-button,
.save-button {
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
  height: 30px;
  font-size: 16px;
  font-weight: 700;
}

.edit-button {
  background: #A7ECF3;
}

.save-button {
  background: ;
}

.currently-showing {
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: white;
}

</style>
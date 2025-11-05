<template>
  <h1>Selecione a atividade que deseja exibir</h1>

  <section class="show-buttons-list">
    <button @click="exibirAtividadeUm = !exibirAtividadeUm">
      {{ exibirAtividadeUm ? 'Ocultar' : 'Mostrar' }} Contador Simples
    </button>
    <button @click="exibirAtividadeDois = !exibirAtividadeDois">
      {{ exibirAtividadeDois ? 'Ocultar' : 'Mostrar' }} Listagem da atividade 2
    </button>
    <button @click="exibirAtividadeTres = !exibirAtividadeTres">
      {{ exibirAtividadeTres ? 'Ocultar' : 'Mostrar' }} Card de mensagens
    </button>
    <button @click="exibirAtividadeQuatro = !exibirAtividadeQuatro">
      {{ exibirAtividadeQuatro ? 'Ocultar' : 'Mostrar' }} Contador do ciclo de vida
    </button>
    <button @click="exibirAtividadeCinco = !exibirAtividadeCinco">
      {{ exibirAtividadeCinco ? 'Ocultar' : 'Mostrar' }} Form de mensagens
    </button>
  </section>

  <!--  Atividade do módulo 1-->
  <section v-if="exibirAtividadeUm">
    <h2>Contador simples</h2>
    <atividadeUm/>
  </section>

  <!--  Atividade do módulo 2-->
  <section v-if="exibirAtividadeDois" class="grey-background">
    <h2>Listagem simples</h2>
    <atividade-dois/>
  </section>

  <!--  Exemplo do módulo 3-->
  <section v-if="exibirAtividadeTres">
    <div class="container">
      <h1 class="titulo">Lista de mensagens</h1>
      <div v-if="mensagens.length > 0">
        <MensagemCard v-for="mensagem in mensagens"
                      :key="mensagem.id"
                      :id="mensagem.id"
                      @remover="removerMensagem">
          <template #titulo>{{ mensagem.titulo }}</template>
          <template #conteudo>{{ mensagem.texto }}</template>
          <template #autor>{{ mensagem.autor }}</template>
          <template #data>{{ mensagem.data }}</template>
        </MensagemCard>
      </div>
      <p v-else>Nenhuma mensagem registrada.</p>
    </div>
  </section>

  <!--  Outro exemplo do módulo 3-->
  <section v-if="exibirAtividadeQuatro">
    <Contador></Contador>
  </section>

  <!--  Atividade do módulo 3-->
  <section v-if="exibirAtividadeCinco">
    <h1 class="titulo">Formulário de mensagens</h1>
    <MensagemForm @adicionar="adicionarMensagem" @limpar="limparMensagens"
                  :showClear="mensagens.length > 0" :categorias="categorias"/>

    <div v-if="mensagens.length > 0" class="card-items">
      <div class="filtros-container">
        <button @click="showFilter = !showFilter"><i class="fa-solid fa-filter"></i></button>
        <div v-if="showFilter" class="filtros">
          <select v-model.trim="categoria">
            <option value="">Mostrar todos</option>

            <option v-for="catg in categorias" :key="catg.id">{{ catg.categoria }}</option>
          </select>
        </div>
      </div>
      <MensagemCard v-for="mensagem in mensagensFiltradas"
                    :key="mensagens.id"
                    :id="mensagem.id"
                    @remover="removerMensagem">
        <template #titulo>{{ mensagem.titulo }}</template>
        <template #conteudo>{{ mensagem.texto }}</template>
        <template #autor>{{ mensagem.autor }}</template>
        <template #data>{{ formatarDataHora(mensagem.dataHoraIso) }}</template>
        <template #categoria>{{ mensagem.categoria }}</template>
      </MensagemCard>
      <p v-if="!mensagensFiltradas.length > 0">Nenhuma mensagem encontrada nessa categoria.</p>
      <p v-else class="destaque">Exibindo {{ mensagensFiltradas.length }} de {{ mensagens.length }}</p>
    </div>
    <p v-else class="vazio">Nenhuma mensagem registrada.</p>
  </section>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import atividadeUm from './components/atividadeUm.vue';
import atividadeDois from './components/atividadeDois.vue';
import MensagemCard from "./components/MensagemCard.vue";
import Contador from "./components/Contador.vue";
import MensagemForm from "./components/MensagemForm.vue";

const exibirAtividadeUm = ref(false)
const exibirAtividadeDois = ref(false)
const exibirAtividadeTres = ref(false)
const exibirAtividadeQuatro = ref(false)
const exibirAtividadeCinco = ref(false)

// teste de emit (módulo 3)
function removerMensagem(id) {
  mensagens.value = mensagens.value.filter((mensagem) => mensagem.id !== id)
}

// função feia que nem o djabo pra gerar data local (módulo 3)
function formatarDataHora(isoString) {
  if (!isoString) return ''
  const dt = new Date(isoString)
  return dt.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

// array de mensagens (módulo 3)
const mensagens = ref([])

let nextId = 0

function adicionarMensagem(payload) {
  mensagens.value.push({
    id: nextId++,
    ...payload,
  })
}

// Atividade do módulo 3
const showFilter = ref(false);

function limparMensagens() {
  mensagens.value = []
}

const categorias = ref([
  {id: 1, categoria: 'Baesse pedro'},
  {id: 2, categoria: 'Pedro Baesse'},
  {id: 3, categoria: 'Criador'},
  {id: 4, categoria: 'Dexter Morgan'},
])

const categoria = ref('')

const mensagensFiltradas = computed(() => {
  if (!categoria.value.length || !categoria) {
    return mensagens.value
  }

  return mensagens.value.filter((mensagem) => {
    return mensagem['categoria'] === categoria.value
  })
})

</script>

<style scoped>

section {
  margin-top: 50px;
}

.titulo {
  font-size: 1.6rem;
}

h2 {
  text-align: center;
}

.show-buttons-list {
  display: flex;
  gap: 20px;
}

.vazio {
  color: #777;
  margin: 8px 0 12px;
  font-style: italic;
}

.card-items {
  margin-top: 20px;
}

.filtros-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.destaque {
  text-align: center;
  font-size: 1.2rem;
}

</style>